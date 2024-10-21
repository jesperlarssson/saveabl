"use client";

import React, { useEffect, useState } from "react";
import useChangeDeliveryDayModal from "@/hooks/useChangeDeliveryDayModal";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";
import { useLang } from "@/hooks/useLang";
import toast from "react-hot-toast";
import {
  stockholmPostalCodes1,
  stockholmPostalCodes2,
  stockholmPostalCodes3,
  skanePostalCodes1,
  skanePostalCodes2,
  vastPostalCodes1,
  vastPostalCodes2,
  vastPostalCodes3,
  vastPostalCodes4,
  vastPostalCodes5,
  vastPostalCodes6,
  vastPostalCodes7,
} from "@/lib/zipCodes"; // Importera alla postnummer

const ChangeDeliveryDayModal = () => {
  const [options, setOptions] = useState<any[]>([]);
  const { onClose, isOpen, customerEmail, postalCode, customerId, isPaused } =
    useChangeDeliveryDayModal();
  const { onOpen, forMessage } = useMessageModal();
  const { text, lang } = useLang(); // Hämta både text och lang från useLang
  const [alwaysUseThisDay, setAlwaysUseThisDay] = useState(false); // Ny state för checkbox

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const textData = text?.my_pages; // Använd data från språköversättningen

  const addTodo = async (action: string, wish: string) => {
    try {
      const res = await axios.post("/api/add-todo", {
        customer_email: customerEmail,
        customer_id: customerId,
        actions: action,
        wish: wish,
      });
      forMessage(true, "");
      onOpen();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnUpdateDeliveryDay = async (desiredDay: string) => {
    let wishMessage = `Vill uppdatera till ${desiredDay}.`;
    if (alwaysUseThisDay) {
      wishMessage += ` Kunden har valt att alltid använda ${desiredDay} som leveransdag.`;
    }

    addTodo("CHANGE_DAY", wishMessage);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const intervalValue = data.get("toDate");

    if (intervalValue && typeof intervalValue === 'string') {
      handleOnUpdateDeliveryDay(intervalValue);
    } else {
      toast.error('Vänligen välj ett giltigt värde');
    }
  };

  useEffect(() => {
    const getOptions = async () => {
      const sanitizedPostalCode = postalCode || "11111";

      try {
        // Hämta leveransdagar
        const response = await axios.get(`/api/gordon/get_delivery_dates/deliverywindow?postalCode=${sanitizedPostalCode}`);
        const deliveryWindows = response.data;

        let allowedDays: number[] = [];

       // Postnummer-logik
       if (stockholmPostalCodes1.includes(sanitizedPostalCode)) {
        allowedDays = [0, 1]; // Sön och Mån
      } else if (stockholmPostalCodes2.includes(sanitizedPostalCode)) {
        allowedDays = [0]; // Sön
      } else if (stockholmPostalCodes3.includes(sanitizedPostalCode)) {
        allowedDays = [1]; // Mån
      } else if (skanePostalCodes1.includes(sanitizedPostalCode)) {
        allowedDays = [0, 1]; // Sön och Mån
      } else if (skanePostalCodes2.includes(sanitizedPostalCode)) {
        allowedDays = [1]; // Mån
      } else if (vastPostalCodes1.includes(sanitizedPostalCode)) {
        allowedDays = [6, 0, 1]; // Lör, Sön, Mån
      } else if (vastPostalCodes2.includes(sanitizedPostalCode)) {
        allowedDays = [6, 1]; // Lör och Mån
      } else if (vastPostalCodes3.includes(sanitizedPostalCode)) {
        allowedDays = [1]; // Mån
      } else if (vastPostalCodes4.includes(sanitizedPostalCode)) {
        allowedDays = [6]; // Lör
      } else if (vastPostalCodes5.includes(sanitizedPostalCode)) {
        allowedDays = [0]; // Sön
      } else if (vastPostalCodes6.includes(sanitizedPostalCode)) {
        allowedDays = [6, 0]; // Lör och Sön
      } else if (vastPostalCodes7.includes(sanitizedPostalCode)) {
        allowedDays = [0, 1]; // Sön och Mån
      } else if (shippingDk.includes(sanitizedPostalCode)) {
        allowedDays = [1]; // Mån
      }

        const filteredOptions = deliveryWindows.filter((option: any) => {
          const startTime = new Date(option.start * 1000);
          const dayOfWeek = startTime.getDay();
          const startHour = startTime.getHours();
          const endHour = new Date(option.end * 1000).getHours();

          // Filtrera på tillåtna dagar
          if (allowedDays.includes(dayOfWeek)) {
            if (dayOfWeek === 6 && startHour === 9 && endHour === 18) return true; // Lördag 9-18
            if (dayOfWeek === 0 && startHour === 10 && endHour <= 17) return true; // Söndag 10-17
            if (dayOfWeek === 1 && startHour === 16 && endHour === 22) return true; // Måndag 16-22
          }
          return false;
        });

        const formattedOptions = filteredOptions.map((option: any) => {
          const startTime = new Date(option.start * 1000);
          const dayOfWeek = startTime.getDay();
          const dayLabel = getDayLabel(dayOfWeek, lang); // Passera språkkoden

          return {
            ...option,
            label: `${dayLabel}, ${startTime.getDate()}/${startTime.getMonth() + 1} ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(option.end * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          };
        });

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Fel vid hämtning av leveransdagar:", error);
      }
    };
    getOptions();
  }, [postalCode, lang]); // Lägg till "lang" som beroende

  // Översätt veckodagar baserat på språkkod (sv, en, da)
  const getDayLabel = (dayOfWeek: number, lang: string) => {
    const dayTranslations: Record<string, Record<number, string>> = {
      sv: {
        6: "Lördag",
        0: "Söndag",
        1: "Måndag",
      },
      en: {
        6: "Saturday",
        0: "Sunday",
        1: "Monday",
      },
      da: {
        6: "Lørdag",
        0: "Søndag",
        1: "Mandag",
      },
    };

    return dayTranslations[lang]?.[dayOfWeek] || "";
  };

  return (
    <Modal
      title={textData?.dayModalTitle}
      description={textData?.dayModalDescription}
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8 p-4"
          >
            <select
              className={twMerge(
                `w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-accent invalid:text-accent
                focus:invalid:border-accent focus:invalid:ring-accent`
              )}
              name="toDate"
              id="toDate"
            >
              <option value="" disabled selected>
                {textData?.deliveryDayModalPlaceholder || "Välj leveransdag"}
              </option>
              {options.map((option) => (
                <option key={option.start} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  onChange={(e) => setAlwaysUseThisDay(e.target.checked)}
                  className="custom-checkbox"
                />
                <span>{textData?.always_use_this_day || "Använd alltid denna leveransdag"}</span>
              </label>
            </div>

            <style jsx>{`
              .custom-checkbox {
                width: 20px;
                height: 20px;
                border: 2px solid #6E2936; /* Border färg */
                appearance: none;
                background-color: white;
                cursor: pointer;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .custom-checkbox:checked {
                background-color: #6E2936;
                border-color: #6E2936;
              }

              .custom-checkbox:checked::before {
                content: "✔";
                color: white;
                font-size: 14px; /* Ändra storlek om du vill justera */
                font-weight: bold;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%); /* Centrera ✔ */
              }
            `}</style>

            <Button type="submit" className="">
              {textData?.change_delivery_day_button || "Ändra leveransdag"}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeDeliveryDayModal;


const shippingDk = [
  "2620",
  "3450",
  "2880",
  "2750",
  "3460",
  "4632",
  "4140",
  "2605",
  "2660",
  "2700",
  "2920",
  "2791",
  "3120",
  "2870",
  "3060",
  "3520",
  "4173",
  "3480",
  "2000",
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
  "3600",
  "3300",
  "4621",
  "2820",
  "3250",
  "2600",
  "4171",
  "2670",
  "3230",
  "3330",
  "4622",
  "2640",
  "3150",
  "2900",
  "3200",
  "3000",
  "2730",
  "4160",
  "3400",
  "4300",
  "2840",
  "3100",
  "3050",
  "3390",
  "4330",
  "2650",
  "2970",
  "2635",
  "4040",
  "4174",
  "3630",
  "2690",
  "2770",
  "4360",
  "4070",
  "4060",
  "2930",
  "2980",
  "2800",
  "3490",
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
  "2200",
  "2400",
  "2300",
  "2450",
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
  "2100",
  "4600",
  "4320",
  "4623",
  "3360",
  "3540",
  "3370",
  "4190",
  "2760",
  "2990",
  "2150",
  "2850",
  "4100",
  "4000",
  "2960",
  "2610",
  "4050",
  "2942",
  "2740",
  "3320",
  "3550",
  "2765",
  "3070",
  "2680",
  "4180",
  "3660",
  "4370",
  "2860",
  "2630",
  "3080",
  "3220",
  "4030",
  "4340",
  "4350",
  "2500",
  "2625",
  "2665",
  "2720",
  "2950",
  "3210",
  "3670",
  "4130",
  "4390",
  "2830",
  "3500",
  "3140",
  "3310",
  "3650",
  "4792",
  "4942",
  "4550",
  "4941",
  "4242",
  "4793",
  "4791",
  "4261",
  "4983",
  "4293",
  "4895",
  "4593",
  "4863",
  "4640",
  "4654",
  "4250",
  "4540",
  "4591",
  "4874",
  "4532",
  "4571",
  "4862",
  "4281",
  "4912",
  "4690",
  "4681",
  "4960",
  "4684",
  "4871",
  "4913",
  "4652",
  "4573",
  "4270",
  "4534",
  "4872",
  "4490",
  "4450",
  "4400",
  "4771",
  "4653",
  "4736",
  "4892",
  "4672",
  "4220",
  "4772",
  "4750",
  "4930",
  "4735",
  "4440",
  "4900",
  "4800",
  "4500",
  "4296",
  "4880",
  "4700",
  "4840",
  "4572",
  "4951",
  "4720",
  "4420",
  "4243",
  "4291",
  "4970",
  "4673",
  "4683",
  "4581",
  "4990",
  "4262",
  "4583",
  "4230",
  "4200",
  "4460",
  "4780",
  "4295",
  "4773",
  "4952",
  "4480",
  "4660",
  "4671",
  "4850",
  "4470",
  "4520",
  "4920",
  "4733",
  "4891",
  "4943",
  "4682",
  "4241",
  "4953",
  "4560",
  "4760",
  "4873",
  "4894",
]; 
