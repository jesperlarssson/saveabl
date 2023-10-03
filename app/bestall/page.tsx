"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/Button";
import useCheckout from "@/hooks/useCheckout";
import { productInfo } from "@/lib/mealkits";
import { addOnsInfo } from "@/lib/addons";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Section from "@/components/ui/Section";
import { deliveryDayParser, getWeekNumber } from "@/helpers/format";
import { AnimatePresence, motion } from "framer-motion";
import AddOnTile from "@/components/general/AddOnTile";
import Title from "@/components/ui/Title";
import CheckoutSection from "@/components/ui/CheckoutSection";
import getDeliveryWindowsForPostalCode from "@/actions/getDeliveryWindowsForPostalCode";
import { UserInformation } from "@/providers/CheckoutProvider";
import instance from "@/lib/apiAxios";
import { productTypes } from "./lib/productTypes";
// Import Stripe
import { loadStripe } from "@stripe/stripe-js";
import Input from "@/components/ui/Input";
import BodyText from "@/components/ui/BodyText";
import { getShippingCostFromPostalCode } from "./lib/getShippingCost";
import PaymentArea from "./components/paymentArea";
import Head from "next/head";
import { useLang } from "@/hooks/useLang";
import { useSearchParams } from "next/navigation";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface Type {
  odd: boolean;
  even: boolean;
}

const variants = {
  open: { opacity: 1, height: "auto", y: 0 },
  closed: { opacity: 0, height: 0, y: -20 },
};

const Order = () => {
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";
  const offerId = parseInt(id, 10);

  const [deliveryDaysLoading, setDeliveryDaysLoading] = useState(false);

  const fetchDeliveryDays = () => {
    return ["Lördag", "Söndag", "Måndag"];
  };

  const [selectedType, setSelectedType] = useState(productTypes[0]);
  const [deliveryWindows, setDeliveryWindows] = useState([]);
  const [showLinks, setShowLinks] = useState(false);

  const [deliveryWindowsErrors, setDeliveryWindowsErrors] = useState<
    string | null
  >(null);

  const deliveryDaysToChoose = [
    {
      label: "Lördag",
      id: 6,
    },
    {
      label: "Söndag",
      id: 0,
    },
    {
      label: "Måndag",
      id: 1,
    },
  ];

  const selectDeliveryDay = (day: any) => {
    // toast.success(
    //   `Du har valt ${day.label} som leveransdag med start: ${day.start} och slut: ${day.end}`
    // );
    const selectedDay = new Date(0);
    selectedDay.setUTCSeconds(day.start);
  };

  const [weekdaysWithDays, setWeekdaysWithDays] = useState<
    { weekday: string; days: number[] }[]
  >([
    {
      weekday: "Laddar...",
      days: [],
    },
  ]);
  const [selectedWeekday, setSelectedWeekday] = useState<number | null>();
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [shippingCostInfo, setShippingCostInfo] = useState<string | null>();
  const [isDk, setIsDk] = useState(false);

  const updateWeekdaysList = (deliveryWindows: any) => {
    // Temp array to keep track of unique weekdays and their day numbers
    const tempWeekdaysWithDays: { weekday: string; days: number[] }[] = [];

    deliveryWindows.windows.forEach((window: any) => {
      const date = new Date(window.start * 1000);
      const weekday = date.toLocaleDateString("sv-SE", { weekday: "long" });
      const day = date.getDay();

      // Skip Tuesdays for now
      if (day === 2) {
        return;
      }

      const existingWeekday = tempWeekdaysWithDays.find(
        (item) => item.weekday === weekday
      );

      if (existingWeekday) {
        existingWeekday.days.push(day);
      } else {
        tempWeekdaysWithDays.push({ weekday, days: [day] });
      }
    });

    // Update the state variable
    setWeekdaysWithDays(tempWeekdaysWithDays);
  };

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const zipCode = e.target.value;
    //remove all non numeric characters
    const zipCodeClean = zipCode.replace(/\D/g, "");
    if (zipCodeClean.length === 4) {
      setPostalCode(zipCodeClean);
    }
    if (zipCodeClean.length === 5) {
      setPostalCode(zipCodeClean);
      setShowDeliveryOptions(true);
      //TODO: Actions get delivery windows available
      try {
        const deliveryWindows = await getDeliveryWindowsForPostalCode(
          zipCode,
          "se"
        );
        updateWeekdaysList(deliveryWindows);
        setShippingCostInfo(getShippingCostFromPostalCode(zipCode));
        setDeliveryWindows(deliveryWindows.windows);
        setDeliveryPeriodId(deliveryWindows.deliveryPeriodId);
      } catch (error) {
        setDeliveryWindowsErrors("Något gick fel. Kontrollera postkoden!");
      }
    }
  };

  const handleGetLinks = () => {
    if (!address.postalCode || address.postalCode.length < 4) {
      toast.error("Du måste ange ett postnummer");
      return;
    }

    if (
      shippingDk.includes(address.postalCode) &&
      address.postalCode.length === 4
    ) {
      setIsDk(true);
    } else {
      setIsDk(false);
    }

    if (address.postalCode.length === 5) {
      setIsDk(false);
    }

    setShowLinks(true);
  };

  const {
    address,
    name,
    extraInfo,
    phone,
    productId,
    deliveryWindow,
    email,
    password,
    deliveryPeriodId,
    setPostalCode,
    setStreetAddress,
    setCity,
    setCountry,
    setAddress,
    setName,
    setPhone,
    setExtraInfo,
    setProductId,
    setDeliveryWindow,
    setEmail,
    setPassword,
    setDeliveryPeriodId,
  } = useCheckout();

  const { text } = useLang();

  useEffect(() => {
    if (address.postalCode && address.postalCode.length < 4) {
      setShowLinks(false);
    }
  }, [address.postalCode]);

  return (
    <Section className="pt-16">
      <div className="w-full flex flex-col items-center ">
        <Title className="text-center">{text.order.title}</Title>
        <BodyText className="text-center max-w-3xl mb-10">
          {text.order.text}
        </BodyText>

        {/* <h3 className="font-poppins text-lg text-secondary ">Vilken typ?</h3>
          <div className="flex gap-4">
            {productTypes.map((productType) => {
              return (
                <CheckoutButton
                key={productType.label}
                selected={productType.id === selectedType.id}
                onClick={() => setSelectedType(productType)}
              >
                {productType.label}
              </CheckoutButton>
            );
          })}
        </div>
        <h3
          key="interval-title"
          className="font-poppins text-lg mt-4 text-secondary"
        >
          Välj variant:
        </h3>
        <div className="flex gap-4">
          {selectedType.variants.map((variant) => {
            return (
              <CheckoutButton
                key={variant.label}
                selected={variant.productId === productId}
                onClick={() => setProductId(variant.productId)}
                disabled={variant.disabled}
              >
                <span>{variant.label}</span>
                <br />
                <span className="text-xs">{variant.price}</span>
              </CheckoutButton>
            );
          })}
        </div> */}

        <div className="my-8 max-w-4xl w-full h-1 border-b border-primary border-opacity-50"></div>
        <div className="flex flex-col items-start my-4">
          <label
            htmlFor="postalcode"
            className="font-poppins text-lg mb-2 text-secondary text-center sm:text-left"
          >
            {text.order.label}
          </label>
          <input
            onChange={handleZipCodeChange}
            id="postalcode"
            placeholder="12345"
            className="border border-primary bg-transparent p-2 rounded-md font-bold w-full placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
          ></input>
          <button
            className="w-64 mx-auto py-2 bg-primary mt-4 rounded-full text-secondary font-bold bg-opacity-90 hover:bg-opacity-100"
            onClick={handleGetLinks}
          >
           {text.order.button}
          </button>
          {/* {shippingCostInfo && (
            <div className="mt-2 font-bold text-secondary">
              {" "}
              Din fraktkostnad: {shippingCostInfo}
            </div>
          )} */}
        </div>

        <div className="my-8 max-w-4xl w-full h-1 border-b border-primary border-opacity-50"></div>
        {showLinks && (
          <PaymentArea
            deliveryWindows={deliveryWindows}
            dk={isDk}
            offerId={offerId}
          />
        )}
      </div>
    </Section>
  );
};

export default Order;

const shippingDk = [
  "3630",
  "4050",
  "4060",
  "4070",
  "4174",
  "4190",
  "4300",
  "4320",
  "4330",
  "4340",
  "4350",
  "4360",
  "4370",
  "4390",
  "2680",
  "2690",
  "4600",
  "4623",
  "4100",
  "4130",
  "4140",
  "4160",
  "4171",
  "4173",
  "4180",
  "4632",
  "4621",
  "4622",
  "4640",
  "4652",
  "4653",
  "4654",
  "4660",
  "4671",
  "4672",
  "4673",
  "4683",
  "4720",
  "4733",
  "4735",
  "4771",
  "4772",
  "4773",
  "4780",
  "4791",
  "4792",
  "4793",
  "4800",
  "4840",
  "4850",
  "4862",
  "4863",
  "4871",
  "4872",
  "4873",
  "4874",
  "4880",
  "4891",
  "4892",
  "4894",
  "4895",
  "4900",
  "4912",
  "4913",
  "4920",
  "4930",
  "4941",
  "4942",
  "4943",
  "4951",
  "4952",
  "4953",
  "4960",
  "4970",
  "4983",
  "4990",
  "4270",
  "4281",
  "4291",
  "4293",
  "4295",
  "4296",
  "4400",
  "4420",
  "4440",
  "4450",
  "4460",
  "4470",
  "4480",
  "4490",
  "4500",
  "4520",
  "4532",
  "4534",
  "4540",
  "4550",
  "4560",
  "4571",
  "4572",
  "4573",
  "4581",
  "4583",
  "4591",
  "4593",
  "4200",
  "4220",
  "4230",
  "4241",
  "4242",
  "4243",
  "4250",
  "4261",
  "4262",
  "4681",
  "4682",
  "4684",
  "4690",
  "4700",
  "4736",
  "4750",
  "4760",
  "9600",
  "9610",
  "9620",
  "9631",
  "9632",
  "9640",
  "9670",
  "9681",
  "9690",
  "7490",
  "7500",
  "7540",
  "7550",
  "7560",
  "7570",
  "7600",
  "7620",
  "7650",
  "7660",
  "7673",
  "7680",
  "7700",
  "7730",
  "7741",
  "7742",
  "7752",
  "7755",
  "7760",
  "7770",
  "7790",
  "7800",
  "7830",
  "7840",
  "7850",
  "7860",
  "7870",
  "7884",
  "7900",
  "7950",
  "7960",
  "7970",
  "7980",
  "7990",
  "6580",
  "6040",
  "6623",
  "7130",
  "7140",
  "7150",
  "7160",
  "7171",
  "7173",
  "7182",
  "7183",
  "7184",
  "7190",
  "7200",
  "7250",
  "7260",
  "7300",
  "7321",
  "7323",
  "8721",
  "8762",
  "8763",
  "8781",
  "8783",
  "7120",
  "8700",
  "8722",
  "8723",
  "6621",
  "6622",
  "6682",
  "6683",
  "6753",
  "6771",
  "6800",
  "6818",
  "6823",
  "6830",
  "6840",
  "6851",
  "6852",
  "6853",
  "6854",
  "6855",
  "6857",
  "6862",
  "6870",
  "6880",
  "6893",
  "6900",
  "6920",
  "6933",
  "6940",
  "6950",
  "6960",
  "6971",
  "6973",
  "6980",
  "6990",
  "7270",
  "7280",
  "7400",
  "7430",
  "7441",
  "7451",
  "7480",
  "6064",
  "6600",
  "6640",
  "6650",
  "6670",
  "6690",
  "6700",
  "6705",
  "6710",
  "6715",
  "6731",
  "6740",
  "6752",
  "8260",
  "8270",
  "8370",
  "8382",
  "8830",
  "8832",
  "8860",
  "8870",
  "8950",
  "8961",
  "8963",
  "8970",
  "8981",
  "8983",
  "8990",
  "9230",
  "9240",
  "9260",
  "9270",
  "9280",
  "9293",
  "9430",
  "9440",
  "9460",
  "9480",
  "9490",
  "9492",
  "9493",
  "9500",
  "9510",
  "9520",
  "9530",
  "9541",
  "9550",
  "9560",
  "9574",
  "9575",
  "7442",
  "7470",
  "8310",
  "8361",
  "8362",
  "8450",
  "8462",
  "8464",
  "8471",
  "8472",
  "8620",
  "8632",
  "8641",
  "8643",
  "8670",
  "8831",
  "8840",
  "8850",
  "8881",
  "8882",
  "8883",
  "7330",
  "7361",
  "7362",
  "8300",
  "8320",
  "8330",
  "8340",
  "8350",
  "8355",
  "8653",
  "8654",
  "8660",
  "8680",
  "8732",
  "8740",
  "8751",
  "8752",
  "8765",
  "8766",
  "2800",
  "2930",
  "3200",
  "3210",
  "3220",
  "3230",
  "3250",
  "3300",
  "3310",
  "3320",
  "3330",
  "3360",
  "3370",
  "3390",
  "2630",
  "2760",
  "2765",
  "2830",
  "2840",
  "2850",
  "2942",
  "2950",
  "2960",
  "2970",
  "2980",
  "2990",
  "3000",
  "3050",
  "3060",
  "3070",
  "3080",
  "3100",
  "3120",
  "3140",
  "3150",
  "3400",
  "3450",
  "3460",
  "3480",
  "3490",
  "3500",
  "3520",
  "3540",
  "3550",
  "3600",
  "3650",
  "3660",
  "3670",
  "4040",
  "2635",
  "2670",
  "5290",
  "5300",
  "5320",
  "5330",
  "5350",
  "5370",
  "5380",
  "5390",
  "5400",
  "5450",
  "5471",
  "5485",
  "5540",
  "5550",
  "5600",
  "5610",
  "5620",
  "5631",
  "5642",
  "5672",
  "5683",
  "5690",
  "5700",
  "5750",
  "5762",
  "5771",
  "5772",
  "5792",
  "5800",
  "5853",
  "5854",
  "5856",
  "5863",
  "5871",
  "5874",
  "5881",
  "5882",
  "5883",
  "5884",
  "5892",
  "5900",
  "5932",
  "5935",
  "5953",
  "6070",
  "6093",
  "6094",
  "6100",
  "6200",
  "6300",
  "6310",
  "6320",
  "6340",
  "6400",
  "6430",
  "6440",
  "6470",
  "9300",
  "9310",
  "9320",
  "9330",
  "9340",
  "9352",
  "9362",
  "9370",
  "9380",
  "9381",
  "9382",
  "9700",
  "9740",
  "9750",
  "9760",
  "9800",
  "9830",
  "9850",
  "9870",
  "9881",
  "9900",
  "9970",
  "9981",
  "9982",
  "9990",
  "8500",
  "8520",
  "8530",
  "8541",
  "8543",
  "8544",
  "8550",
  "8560",
  "8570",
  "8581",
  "8585",
  "8586",
  "2640",
  "4000",
  "4030",
  "8400",
  "8410",
  "8420",
  "8444",
  "5000",
  "5200",
  "5210",
  "5220",
  "5230",
  "5240",
  "5250",
  "5260",
  "5270",
  "5462",
  "5463",
  "5464",
  "5466",
  "5474",
  "5491",
  "5492",
  "5500",
  "5560",
  "5580",
  "5591",
  "5592",
  "6230",
  "6240",
  "6261",
  "6270",
  "6280",
  "6330",
  "6360",
  "6372",
  "6392",
  "6500",
  "6510",
  "6520",
  "6534",
  "6535",
  "6541",
  "6560",
  "6630",
  "6660",
  "6760",
  "6780",
  "6792",
  "8000",
  "8200",
  "8210",
  "8230",
  "8240",
  "8250",
  "8380",
  "8900",
  "8920",
  "8930",
  "8940",
  "8960",
  "9000",
  "9200",
  "9210",
  "9220",
  "9400",
  "8220",
  "8381",
  "8600",
  "8800",
  "1050",
  "1051",
  "1052",
  "1053",
  "1054",
  "1055",
  "1056",
  "1057",
  "1058",
  "1059",
  "1060",
  "1061",
  "1062",
  "1063",
  "1064",
  "1065",
  "1066",
  "1067",
  "1068",
  "1069",
  "1070",
  "1071",
  "1072",
  "1073",
  "1074",
  "1100",
  "1101",
  "1102",
  "1103",
  "1104",
  "1105",
  "1106",
  "1107",
  "1110",
  "1111",
  "1112",
  "1113",
  "1114",
  "1115",
  "1116",
  "1117",
  "1118",
  "1119",
  "1120",
  "1121",
  "1122",
  "1123",
  "1124",
  "1125",
  "1126",
  "1127",
  "1128",
  "1129",
  "1130",
  "1131",
  "1150",
  "1151",
  "1152",
  "1153",
  "1154",
  "1155",
  "1156",
  "1157",
  "1158",
  "1159",
  "1160",
  "1161",
  "1162",
  "1164",
  "1165",
  "1166",
  "1167",
  "1168",
  "1169",
  "1170",
  "1171",
  "1172",
  "1173",
  "1174",
  "1175",
  "1200",
  "1201",
  "1202",
  "1203",
  "1204",
  "1205",
  "1206",
  "1207",
  "1208",
  "1209",
  "1210",
  "1211",
  "1212",
  "1213",
  "1214",
  "1215",
  "1216",
  "1218",
  "1219",
  "1220",
  "1221",
  "1250",
  "1251",
  "1252",
  "1253",
  "1254",
  "1255",
  "1256",
  "1257",
  "1259",
  "1260",
  "1261",
  "1263",
  "1264",
  "1265",
  "1266",
  "1267",
  "1268",
  "1270",
  "1271",
  "1300",
  "1301",
  "1302",
  "1303",
  "1304",
  "1306",
  "1307",
  "1308",
  "1309",
  "1310",
  "1311",
  "1312",
  "1313",
  "1314",
  "1315",
  "1316",
  "1317",
  "1318",
  "1319",
  "1320",
  "1321",
  "1322",
  "1323",
  "1324",
  "1325",
  "1326",
  "1327",
  "1328",
  "1329",
  "1350",
  "1352",
  "1353",
  "1354",
  "1355",
  "1356",
  "1357",
  "1358",
  "1359",
  "1360",
  "1361",
  "1362",
  "1363",
  "1364",
  "1365",
  "1366",
  "1367",
  "1368",
  "1369",
  "1370",
  "1371",
  "1400",
  "1401",
  "1402",
  "1403",
  "1406",
  "1407",
  "1408",
  "1409",
  "1410",
  "1411",
  "1412",
  "1413",
  "1414",
  "1415",
  "1416",
  "1417",
  "1418",
  "1419",
  "1420",
  "1421",
  "1422",
  "1423",
  "1424",
  "1425",
  "1426",
  "1427",
  "1428",
  "1429",
  "1430",
  "1432",
  "1434",
  "1435",
  "1436",
  "1437",
  "1438",
  "1439",
  "1440",
  "1441",
  "1450",
  "1451",
  "1452",
  "1453",
  "1454",
  "1455",
  "1456",
  "1457",
  "1458",
  "1459",
  "1460",
  "1461",
  "1462",
  "1463",
  "1464",
  "1465",
  "1466",
  "1467",
  "1468",
  "1470",
  "1471",
  "1472",
  "1473",
  "1550",
  "1551",
  "1552",
  "1553",
  "1554",
  "1555",
  "1556",
  "1557",
  "1558",
  "1559",
  "1560",
  "1561",
  "1562",
  "1563",
  "1564",
  "1567",
  "1568",
  "1569",
  "1570",
  "1571",
  "1572",
  "1573",
  "1574",
  "1575",
  "1576",
  "1577",
  "1600",
  "1601",
  "1602",
  "1603",
  "1604",
  "1605",
  "1606",
  "1607",
  "1608",
  "1609",
  "1610",
  "1611",
  "1612",
  "1613",
  "1614",
  "1615",
  "1616",
  "1617",
  "1618",
  "1619",
  "1620",
  "1621",
  "1622",
  "1623",
  "1624",
  "1631",
  "1632",
  "1633",
  "1634",
  "1635",
  "1650",
  "1651",
  "1652",
  "1653",
  "1654",
  "1655",
  "1656",
  "1657",
  "1658",
  "1659",
  "1660",
  "1661",
  "1662",
  "1663",
  "1664",
  "1665",
  "1666",
  "1667",
  "1668",
  "1669",
  "1670",
  "1671",
  "1672",
  "1673",
  "1674",
  "1675",
  "1676",
  "1677",
  "1699",
  "1700",
  "1701",
  "1702",
  "1703",
  "1704",
  "1705",
  "1706",
  "1707",
  "1708",
  "1709",
  "1710",
  "1711",
  "1712",
  "1714",
  "1715",
  "1716",
  "1717",
  "1718",
  "1719",
  "1720",
  "1721",
  "1722",
  "1723",
  "1724",
  "1725",
  "1726",
  "1727",
  "1728",
  "1729",
  "1730",
  "1731",
  "1732",
  "1733",
  "1734",
  "1735",
  "1736",
  "1737",
  "1738",
  "1739",
  "1749",
  "1750",
  "1751",
  "1752",
  "1753",
  "1754",
  "1755",
  "1756",
  "1757",
  "1758",
  "1759",
  "1760",
  "1761",
  "1762",
  "1763",
  "1764",
  "1765",
  "1766",
  "1770",
  "1771",
  "1772",
  "1773",
  "1774",
  "1775",
  "1777",
  "1799",
  "1800",
  "1801",
  "1802",
  "1803",
  "1804",
  "1805",
  "1806",
  "1807",
  "1808",
  "1809",
  "1810",
  "1811",
  "1812",
  "1813",
  "1814",
  "1815",
  "1816",
  "1817",
  "1818",
  "1819",
  "1820",
  "1822",
  "1823",
  "1824",
  "1825",
  "1826",
  "1827",
  "1828",
  "1829",
  "1850",
  "1851",
  "1852",
  "1853",
  "1854",
  "1855",
  "1856",
  "1857",
  "1860",
  "1861",
  "1862",
  "1863",
  "1864",
  "1865",
  "1866",
  "1867",
  "1868",
  "1870",
  "1871",
  "1872",
  "1873",
  "1874",
  "1875",
  "1876",
  "1877",
  "1878",
  "1879",
  "1900",
  "1901",
  "1902",
  "1903",
  "1904",
  "1905",
  "1906",
  "1908",
  "1909",
  "1910",
  "1911",
  "1912",
  "1913",
  "1914",
  "1915",
  "1916",
  "1917",
  "1920",
  "1921",
  "1922",
  "1923",
  "1924",
  "1925",
  "1926",
  "1927",
  "1928",
  "1950",
  "1951",
  "1952",
  "1953",
  "1954",
  "1955",
  "1956",
  "1957",
  "1958",
  "1959",
  "1960",
  "1961",
  "1962",
  "1963",
  "1964",
  "1965",
  "1966",
  "1967",
  "1970",
  "1971",
  "1972",
  "1973",
  "1974",
  "2000",
  "2100",
  "2150",
  "2200",
  "2300",
  "2400",
  "2450",
  "2500",
  "2600",
  "2605",
  "2610",
  "2620",
  "2625",
  "2650",
  "2660",
  "2665",
  "2700",
  "2720",
  "2730",
  "2740",
  "2770",
  "2791",
  "2820",
  "2860",
  "2870",
  "2880",
  "2900",
  "2920",
  "2750",
  "6000",
  "6051",
  "6052",
  "7000",
  "7080",
  "7100",
  "6091",
  "6092",
];

// "use client";

// import Image from "next/image";
// import { twMerge } from "tailwind-merge";

// import Button from "@/components/ui/Button";
// import useCheckout from "@/hooks/useCheckout";
// import { productInfo } from "@/lib/mealkits";
// import { addOnsInfo } from "@/lib/addons";
// import React, { ChangeEvent, use, useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import Section from "@/components/ui/Section";
// import { deliveryDayParser, getWeekNumber } from "@/helpers/format";
// import { AnimatePresence, motion } from "framer-motion";
// import AddOnTile from "@/components/general/AddOnTile";
// import Title from "@/components/ui/Title";
// import CheckoutSection from "@/components/ui/CheckoutSection";
// import getDeliveryWindowsForPostalCode from "@/actions/getDeliveryWindowsForPostalCode";
// import { UserInformation } from "@/providers/CheckoutProvider";
// import instance from "@/lib/apiAxios";
// // Import Stripe
// import { loadStripe } from "@stripe/stripe-js";
// import Input from "@/components/ui/Input";

// // Initialize Stripe
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
// );

// interface Type {
//   odd: boolean;
//   even: boolean;
// }

// const variants = {
//   open: { opacity: 1, height: "auto", y: 0 },
//   closed: { opacity: 0, height: 0, y: -20 },
// };

// const Order = () => {
//   // true, true = prenumeration varje vecka
//   // true, false = prenumeration varannan vecka (udda veckor)
//   // false, true = prenumeration varannan vecka (jämna veckor)
//   // false, false = engångsköp

//   {
//     /**

//     1. Välj prenumeration eller engångsköp - setState
//     2. Fyll i postkod sedan om prenumeration välj intervall. och oavsett kolla leveransdagar och välj.
//     3. Välj tillägg
//     4. leverans och betalning

// */
//   }

//   const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

//   const [deliveryDaysLoading, setDeliveryDaysLoading] = useState(false);

//   const fetchDeliveryDays = () => {
//     return ["Lördag", "Söndag", "Måndag"];
//   };

//   const productTypes = [
//     {
//       id: "subscription",
//       label: "Prenumeration",
//       variants: [
//         {
//           label: "Varje vecka",
//           productId: "570897f5-82f5-482e-a2c6-fd94f001486a", //TODO: update for prod env
//           disabled: false,
//         },
//         {
//           label: "Varannan vecka",
//           productId: "688a4c8c-0d0d-45ab-9dc4-4525a004f710", //TODO: update for prod env
//           disabled: false,
//         },
//       ],
//     },
//     {
//       id: "standard",
//       label: "Engångsköp",
//       variants: [
//         {
//           label: "12 portioner",
//           productId: "68b57d6d-035a-4692-ad26-cb0028d1d29a", //TODO: update for prod env
//           disabled: false,
//         },
//         {
//           label: "8 portioner",
//           productId: "570897f5-82f5-482e-a2c6-fd94f001486a", //TODO: update for prod env
//           disabled: true,
//         },
//       ],
//     },
//   ];
//   const [selectedType, setSelectedType] = useState(productTypes[0]);
//   const [deliveryWindows, setDeliveryWindows] = useState([]);
//   const [deliveryWindowsErrors, setDeliveryWindowsErrors] = useState<
//     string | null
//   >(null);

//   const deliveryDaysToChoose = [
//     {
//       label: "Lördag",
//       id: 6,
//     },
//     {
//       label: "Söndag",
//       id: 0,
//     },
//     {
//       label: "Måndag",
//       id: 1,
//     },
//   ];

//   const selectDeliveryDay = (day: any) => {
//     // toast.success(
//     //   `Du har valt ${day.label} som leveransdag med start: ${day.start} och slut: ${day.end}`
//     // );
//     const selectedDay = new Date(0);
//     selectedDay.setUTCSeconds(day.start);
//   };

//   const [weekdaysWithDays, setWeekdaysWithDays] = useState<
//     { weekday: string; days: number[] }[]
//   >([
//     {
//       weekday: "Laddar...",
//       days: [],
//     },
//   ]);
//   const [selectedWeekday, setSelectedWeekday] = useState<number | null>();
//   const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

//   const updateWeekdaysList = (deliveryWindows: any) => {
//     // Temp array to keep track of unique weekdays and their day numbers
//     const tempWeekdaysWithDays: { weekday: string; days: number[] }[] = [];

//     deliveryWindows.windows.forEach((window: any) => {
//       const date = new Date(window.start * 1000);
//       const weekday = date.toLocaleDateString("sv-SE", { weekday: "long" });
//       const day = date.getDay();

//       // Skip Tuesdays for now
//       if (day === 2) {
//         return;
//       }

//       const existingWeekday = tempWeekdaysWithDays.find(
//         (item) => item.weekday === weekday
//       );

//       if (existingWeekday) {
//         existingWeekday.days.push(day);
//       } else {
//         tempWeekdaysWithDays.push({ weekday, days: [day] });
//       }
//     });

//     // Update the state variable
//     setWeekdaysWithDays(tempWeekdaysWithDays);
//   };

//   const handleZipCodeChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const zipCode = e.target.value;
//     //remove all non numeric characters
//     const zipCodeClean = zipCode.replace(/\D/g, "");
//     if (zipCodeClean.length === 5) {
//       setPostalCode(zipCodeClean);
//       setShowDeliveryOptions(true);
//       //TODO: Actions get delivery windows available
//       try {
//         const deliveryWindows = await getDeliveryWindowsForPostalCode(
//           zipCode,
//           "se"
//         );
//         updateWeekdaysList(deliveryWindows);
//         setDeliveryWindows(deliveryWindows.windows);
//         setDeliveryPeriodId(deliveryWindows.deliveryPeriodId);
//       } catch (error) {
//         setDeliveryWindowsErrors("Något gick fel. Kontrollera postkoden!");
//       }
//     }
//   };

//   const {
//     address,
//     name,
//     extraInfo,
//     phone,
//     productId,
//     deliveryWindow,
//     email,
//     password,
//     deliveryPeriodId,
//     setPostalCode,
//     setStreetAddress,
//     setCity,
//     setCountry,
//     setAddress,
//     setName,
//     setPhone,
//     setExtraInfo,
//     setProductId,
//     setDeliveryWindow,
//     setEmail,
//     setPassword,
//     setDeliveryPeriodId,
//   } = useCheckout();

//   // Function to redirect to Stripe Checkout
//   async function redirectToCheckout(sessionId: string) {
//     const stripe = await stripePromise;
//     if (!stripe) {
//       return;
//     }
//     const { error } = await stripe.redirectToCheckout({
//       sessionId,
//     });
//     if (error) {
//       console.error(error);
//     }
//   }

//   type RowError = {
//     message: string | null;
//   };

//   type FormError = {
//     name: RowError | null;
//     address: RowError | null;
//     phone: RowError | null;
//     email: RowError | null;
//     password: RowError | null;
//     city: RowError | null;
//     extraInfo: RowError | null;
//   };

//   const [formErrors, setFormErrors] = useState<FormError>({
//     name: null,
//     address: null,
//     phone: null,
//     email: null,
//     password: null,
//     city: null,
//     extraInfo: null,
//   });

//   const handleConfirm = async () => {
//     setCountry("SE");

//     //Validate form
//     const errors: FormError = {
//       name: null,
//       address: null,
//       phone: null,
//       email: null,
//       password: null,
//       city: null,
//       extraInfo: null,
//     };

//     if (!name || name.length < 2) {
//       errors.name = {
//         message: "Fyll i ditt fullständiga namn",
//       };
//     }

//     if (!address.street || address.street.length < 2) {
//       errors.address = {
//         message: "Fyll i din adress",
//       };
//     }

//     if (!phone || phone.length < 2) {
//       errors.phone = {
//         message: "Fyll i ditt telefonnummer",
//       };
//     }

//     if (!email || email.length < 2) {
//       errors.email = {
//         message: "Fyll i din e-post",
//       };
//     }

//     if (!password || password.length < 6) {
//       errors.password = {
//         message: "Fyll i ditt lösenord längre än 6 tecken",
//       };
//     }

//     if (!address.city || address.city.length < 2) {
//       errors.city = {
//         message: "Fyll i din stad",
//       };
//     }

//     setFormErrors(errors);
//     const hasErrors = Object.values(errors).some((error) => error !== null);
//     if (hasErrors) return;
//     if (!agreeToTerms) {
//       toast.error("Du måste godkänna villkoren för att gå vidare!");
//       return;
//     }

//     const userInformation: UserInformation = {
//       address,
//       name,
//       phone,
//       extraInfo: extraInfo || "",
//       productId,
//       deliveryWindow,
//       email,
//       password,
//       deliveryPeriodId,
//       addOns: [], //TODO: Add delivery fee as addon
//     };

//     // TODO: Post to backend
//     console.log("User information to be sent to the backend:", userInformation);

//     try {
//       const res = await instance.post("checkout", userInformation);
//       console.log("Response from backend:", res.data);
//       const data = await res.data;
//       redirectToCheckout(data.id);
//     } catch (error: any) {
//       console.log("Error from backend:", error);
//       if (error.response.data.code === 401) {
//         toast.error("Användaren finns redan, prova att logga in!");
//       }
//     }
//   };

//   return (
//     <Section className="pt-10">
//       <CheckoutSection title="Välj matkasse">
//         <h3 className="font-poppins text-lg ">Vilken typ?</h3>
//         <div className="flex gap-4">
//           {productTypes.map((productType) => {
//             return (
//               <CheckoutButton
//                 key={productType.label}
//                 selected={productType.id === selectedType.id}
//                 onClick={() => setSelectedType(productType)}
//               >
//                 {productType.label}
//               </CheckoutButton>
//             );
//           })}
//         </div>
//         <h3 key="interval-title" className="font-poppins text-lg mt-4">
//           Välj variant:
//         </h3>
//         <div className="flex gap-4">
//           {selectedType.variants.map((variant) => {
//             return (
//               <CheckoutButton
//                 key={variant.label}
//                 selected={variant.productId === productId}
//                 onClick={() => setProductId(variant.productId)}
//                 disabled={variant.disabled}
//               >
//                 {variant.label}
//               </CheckoutButton>
//             );
//           })}
//         </div>
//       </CheckoutSection>

//       <CheckoutSection title="Leverans">
//         <div className="flex flex-col items-start my-4">
//           <label htmlFor="postalcode" className="font-poppins text-lg mb-2">
//             Fyll i ditt postnummer för leveransalternativ
//           </label>
//           <input
//             onChange={handleZipCodeChange}
//             id="postalcode"
//             placeholder="12345"
//             className="border border-primary bg-transparent p-2 rounded-md font-bold w-full placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
//           ></input>
//         </div>

//         <AnimatePresence mode="wait">
//           {showDeliveryOptions && (
//             <motion.div
//               key="delivery-options"
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={variants}
//               className=""
//             >
//               <h3 key="title-delivery" className="font-poppins text-lg">
//                 Välj leveransdag:
//               </h3>
//               {/** TODO: Doesn't work for all zips */}

//               <div className="flex gap-4 flex-wrap">
//                 <AnimatePresence mode="wait">
//                   {deliveryWindowsErrors && deliveryWindows.length == 0 ? (
//                     <motion.div
//                       key="error"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
//                     >
//                       <p className="font-poppins text-md">
//                         {deliveryWindowsErrors}
//                       </p>
//                     </motion.div>
//                   ) : (
//                     weekdaysWithDays.map((day: any, index: number) => (
//                       <motion.div
//                         key={day.label}
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ delay: 0.15 * index }}
//                       >
//                         <CheckoutButton
//                           className="capitalize"
//                           selected={selectedWeekday == day.days[0]}
//                           onClick={() => {
//                             if (selectedWeekday == day.days[0]) {
//                               setSelectedWeekday(null);
//                               return;
//                             }
//                             setSelectedWeekday(day.days[0]);
//                           }}
//                         >
//                           {day.weekday}
//                         </CheckoutButton>
//                       </motion.div>
//                     ))
//                   )}
//                 </AnimatePresence>
//               </div>
//               {selectedWeekday != null && (
//                 <>
//                   <h3 className="font-poppins text-lg mt-4">
//                     När vill du ha din matkasse?
//                   </h3>
//                   <div className="flex gap-4 flex-wrap max-w-xl">
//                     <AnimatePresence mode="wait">
//                       {deliveryWindows
//                         .filter(({ start }) => {
//                           // Convert UTC seconds to milliseconds and create Date object
//                           const date = new Date(start * 1000);
//                           // Return whether the day of the week matches the target weekday
//                           return date.getDay() === selectedWeekday;
//                         })
//                         .map((window: any, index: number) => (
//                           <motion.div
//                             key={window.label}
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             transition={{ delay: 0.15 * index }}
//                           >
//                             <CheckoutButton
//                               selected={deliveryWindow?.start == window.start}
//                               onClick={() => {
//                                 if (deliveryWindow?.start == window.start) {
//                                   setDeliveryWindow(null);
//                                   return;
//                                 }
//                                 setDeliveryWindow(window);
//                               }}
//                             >
//                               {window.label}
//                             </CheckoutButton>
//                           </motion.div>
//                         ))}
//                       {selectedWeekday === null ||
//                       ![0, 1, 6].includes(selectedWeekday!) ||
//                       deliveryWindows.length == 0 ? (
//                         <motion.div
//                           key="error"
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
//                         >
//                           <p className="font-poppins text-md">
//                             Välj en leveransdag först
//                           </p>
//                         </motion.div>
//                       ) : null}
//                     </AnimatePresence>
//                   </div>
//                 </>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </CheckoutSection>

//       <CheckoutSection title="Adress">
//         <label htmlFor="address" className="font-poppins text-lg mb-2">
//           Fyll i din leveransadress
//         </label>
//         <div className="grid grid-cols-2 gap-4 items-start my-4">
//           <Input
//             label="Fullständigt namn"
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             parentClassName="col-span-2"
//             id="name"
//             placeholder="Förnamn Efternamn"
//             error={formErrors.name}
//           />

//           <Input
//             label="Adress"
//             onChange={(e) => setStreetAddress(e.target.value)}
//             type="text"
//             id="address"
//             placeholder="Klimatgatan 1"
//             error={formErrors.address}
//           />
//           <Input
//             label="Ort"
//             onChange={(e) => setCity(e.target.value)}
//             type="text"
//             id="city"
//             placeholder="Göteborg"
//             error={formErrors.city}
//           />
//           <div className="w-full col-span-2 -mt-4">
//             <label
//               htmlFor="extraInfo"
//               className={twMerge(
//                 `block w-full text-md font-bold text-primary-600 ml-1 px-1 max-w-fit bg-primary-200 translate-y-3 transition`
//               )}
//             >
//               Extra Information
//             </label>

//             <textarea
//               id="extraInfo"
//               placeholder="Till exempel våning, portkod eller annan information som kan vara bra för oss att veta."
//               onChange={(e) => setExtraInfo(e.target.value)}
//               className="border w-full border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
//             ></textarea>
//           </div>
//         </div>

//         <h3 className="font-poppins text-lg mt-4">Kontaktuppgifter</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <Input
//             onChange={(e) => setPhone(e.target.value)}
//             id="phone"
//             label="Telefonnummer"
//             type="text"
//             placeholder="0701234567"
//             parentClassName="col-span-2 -mt-2"
//             error={formErrors.phone}
//           />
//           <Input
//             onChange={(e) => setEmail(e.target.value)}
//             id="email"
//             label="E-post"
//             type="text"
//             placeholder="E-post"
//             error={formErrors.email}
//           />
//           <Input
//             onChange={(e) => setPassword(e.target.value)}
//             id="password"
//             label="Lösenord"
//             placeholder="Lösenord"
//             type="password"
//             error={formErrors.password}
//           />
//         </div>
//         {/* Checkbox */}
//         <div className="w-full px-2 my-4">
//           <label className="">
//             <input
//               type="checkbox"
//               className="mr-2"
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setAgreeToTerms(e.target.checked)
//               }
//             />
//             Jag godkänner villkoren och förstår att ett konto kommer att skapas.
//           </label>
//         </div>
//       </CheckoutSection>

//       <Button onClick={handleConfirm}>Registrera och betala</Button>

//       {/* <CheckoutSection title="Tillägg">
//         <div className="flex gap-4">
//           <AnimatePresence mode="wait">
//             {addOnsInfo.map((addOn) => (
//               <AddOnTile key={addOn.id} addon={addOn} />
//             ))}
//           </AnimatePresence>
//         </div>
//       </CheckoutSection> */}
//     </Section>
//   );
// };

// export default Order;
//   return (
//     <Section className="pt-10">
//       <CheckoutSection title="Välj matkasse">
//         <h3 className="font-poppins text-lg ">Vilken typ?</h3>
//         <div className="flex gap-4">
//           <CheckoutButton
//             selected={productType.odd || productType.even}
//             onClick={() => selectNextSubscription(true)}
//           >
//             Prenumeration
//           </CheckoutButton>
//           <CheckoutButton
//             selected={
//               !productType.odd &&
//               !productType.even &&
//               productType.odd !== null &&
//               productType.even !== null
//             }
//             onClick={selectNextOneTimePurchase}
//           >
//             Engångsköp
//           </CheckoutButton>
//           {/* <CheckoutButton
//             selected={!productType.odd && !productType.even}
//             onClick={selectNextOneTimePurchase}
//           >
//             Prova på
//           </CheckoutButton> */}
//         </div>
//         <IntervalButtons
//           show={productType.odd || productType.even}
//           productType={productType}
//           selectNextSubscription={selectNextSubscription}
//         />
//       </CheckoutSection>

//       <CheckoutSection title="Leverans">
//         <div className="flex flex-col items-start my-4">
//           <label htmlFor="postalcode" className="font-poppins text-lg mb-2">
//             Fyll i ditt postnummer för leveransalternativ
//           </label>
//           <input
//             onChange={handleZipCodeChange}
//             id="postalcode"
//             placeholder="12345"
//             className="border border-primary bg-transparent p-2 rounded-md font-bold placeholder-neutral-400 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
//           ></input>
//         </div>

//         <AnimatePresence mode="wait">
//           {showDeliveryOptions && (
//             <motion.div
//               key="delivery-options"
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={variants}
//               className=""
//             >
//               <h3 key="title-delivery" className="font-poppins text-lg">
//                 Välj leveransdag:
//               </h3>
//               {/** TODO: Doesn't work for all zips */}

//               <div className="flex gap-4 flex-wrap">
//                 <AnimatePresence mode="wait">
//                   {deliveryDaysError && deliveryDays.length == 0 ? (
//                     <motion.div
//                       key="error"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
//                     >
//                       <p className="font-poppins text-md">
//                         {deliveryDaysError}
//                       </p>
//                     </motion.div>
//                   ) : (
//                     deliveryDaysToChoose.map(
//                       (day: { id: number; label: string }, index: number) => (
//                         <motion.div
//                           key={day.label}
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           transition={{ delay: 0.15 * index }}
//                         >
//                           <CheckoutButton
//                             selected={preferredWeekDay == day.id}
//                             onClick={() => {
//                               if (preferredWeekDay == day.id) {
//                                 setPreferredWeekDay(null);
//                                 return;
//                               }
//                               setPreferredWeekDay(day.id);
//                             }}
//                           >
//                             {day.label}
//                           </CheckoutButton>
//                         </motion.div>
//                       )
//                     )
//                   )}
//                 </AnimatePresence>
//               </div>
//               <h3 className="font-poppins text-lg mt-4">
//                 När vill du ha din första matkasse?
//               </h3>
//               <div className="flex gap-4 flex-wrap">
//                 <AnimatePresence mode="wait">
//                   {deliveryDays
//                     .filter(({ start }) => {
//                       // Convert UTC seconds to milliseconds and create Date object
//                       const date = new Date(start * 1000);
//                       // Return whether the day of the week matches the target weekday
//                       return date.getDay() === preferredWeekDay;
//                     })
//                     .map((day: any, index: number) => (
//                       <motion.div
//                         key={day.label}
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ delay: 0.1 * index, duration: 0.15 }}
//                       >
//                         <CheckoutButton
//                           selected={deliveryDay?.id == day.id}
//                           onClick={() => {
//                             selectDeliveryDay(day);
//                           }}
//                         >
//                           <span className="">{day.label}</span>
//                           {/* <span className="capitalize">
//                             {new Date(day.start * 1000).toLocaleDateString(
//                               "sv-SE",
//                               { weekday: "long", month: "long", day: "numeric" }
//                             )}
//                           </span> */}
//                         </CheckoutButton>
//                       </motion.div>
//                     ))}
//                   {preferredWeekDay === null ||
//                   ![0, 1, 6].includes(preferredWeekDay) ||
//                   deliveryDays.length == 0 ? (
//                     <motion.div
//                       key="error"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
//                     >
//                       <p className="font-poppins text-md">
//                         Välj en leveransdag först
//                       </p>
//                     </motion.div>
//                   ) : null}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </CheckoutSection>

//       <CheckoutSection title="Tillägg">
//         <div className="flex gap-4">
//           <AnimatePresence mode="wait">
//             {addOnsInfo.map((addOn) => (
//               <AddOnTile key={addOn.id} addon={addOn} />
//             ))}
//           </AnimatePresence>
//         </div>
//       </CheckoutSection>

//       <Button onClick={() => addMealKit(productInfo[2])}>Prova på</Button>
//     </Section>
//   );
// };

// export default Order;

const CheckoutButton = ({
  children,
  onClick,
  disabled,
  selected,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      className={twMerge(
        `mt-2 px-8 py-2 border bg-transparent text-neutral-700 font-medium border-primary rounded-md w-auto transition-all hover:bg-primary`,
        [
          selected && `bg-primary text-secondary font-bold`,
          disabled && `opacity-50`,
          className,
        ]
      )}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

const IntervalButtons = ({
  productType,
  show,
  selectNextSubscription,
}: {
  productType: Type;
  show: boolean;
  selectNextSubscription: (allWeeks: boolean) => void;
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intervalButtons"
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          className="mt-4 text-neutral-700"
        >
          <h3 key="interval-title" className="font-poppins text-lg ">
            Välj intervall:
          </h3>
          <div key="interval-buttons" className="flex gap-4">
            <CheckoutButton
              key="interval-button-1"
              selected={productType.even && productType.odd}
              onClick={() => selectNextSubscription(true)}
            >
              Varje vecka
            </CheckoutButton>
            <CheckoutButton
              key="interval-button-2"
              selected={
                (productType.even || productType.odd) &&
                !(productType.even && productType.odd)
              }
              onClick={() => selectNextSubscription(false)}
            >
              Varannan vecka
            </CheckoutButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
