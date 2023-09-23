"use client";

import { useAuth } from "@/hooks/useAuth";
import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";
import BodyText from "@/components/ui/BodyText";
import TitleH2 from "@/components/ui/TitleH2";
import { twMerge } from "tailwind-merge";
import { Recipe } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { getWeekNumber } from "@/helpers/format";
import toast from "react-hot-toast";
import instance from "@/lib/apiAxios";
import { DeliveryWindow } from "@/providers/CheckoutProvider";
import useAddMealkitModal from "@/hooks/useAddMealkitModal";


const MyPageContent = () => {
  const auth = useAuth();

  const { user, signOut } = auth || {};

  const handleSignOut = () => {
    if (signOut) signOut();
  };

  const { onOpen, setPostalCode, setWeek, setSubscriptionId } =
    useAddMealkitModal();

  const currentWeekNumber = getWeekNumber(new Date());

  var userInterval = 2;

  const upcomingMealkits = [
    {
      weekNumber: currentWeekNumber,
      portions: 2,
      nrRecipes: 3,
    },
    {
      weekNumber: (currentWeekNumber + 1) % 52,
      portions: 2,
      nrRecipes: 3,
    },
    {
      weekNumber: (currentWeekNumber + 2) % 52,
      portions: 2,
      nrRecipes: 3,
    },
  ];

  const deliveryDays = [
    {
      day: "Lördag",
      number: 6,
    },
    {
      day: "Söndag",
      number: 0,
    },
    {
      day: "Måndag",
      number: 1,
    },
  ];

  const getDayStringFromNumber = (number: number | null) => {
    const day = deliveryDays.find((day) => day.number === number);
    return day?.day;
  };

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
      city: "",
    },
    subscription: {
      id: "",
      price: {
        schedule: {
          intervalCount: 0,
          interval: "",
        },
      },
      weeklyDeliveryDay: 0,
    },

    mealKits: [
      {
        weekNumber: 0,
        portions: 0,
        nrRecipes: 0,
      },
    ],
  });
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    id: "",
    price: {
      schedule: {
        intervalCount: 0,
        interval: "",
      },
    },
    weeklyDeliveryDay: 0,
  });
  const [userMealkits, setUserMealkits] = useState([]);
  const [nextDelivery, setNextDelivery] = useState();
  const [deliveryInfo, setDeliveryInfo] = useState({
    street: "",
    postalCode: "",
    city: "",
  });
  const [prefferedDeliveryDay, setPrefferedDeliveryDay] = useState(0);
  const [subscriptionFrequency, setSubscriptionFrequency] = useState("");
  const [nextDeliveryDate, setNextDeliveryDate] = useState("");
  const [oddOrEvenSubscription, setOddOrEvenSubscription] = useState({
    string: "",
    odd: false,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) return;
      const userDetails: any = await instance.get(`me`);
      setUserDetails(userDetails.data);
      setSubscriptionDetails(userDetails.data.subscription);
      setUserMealkits(userDetails.data.mealKits);
      setDeliveryInfo(userDetails.data.address);
      setPrefferedDeliveryDay(userDetails.data.subscription.weeklyDeliveryDay);

      console.log("userDetails", userDetails.data);

      // SET NEXT DELIVERY -------
      // Sort the mealKits array by the scheduledFor.date field
      const sortedMealKits = userDetails?.data.mealKits.sort(
        (
          a: { scheduledFor: { date: number } },
          b: { scheduledFor: { date: number } }
        ) => a.scheduledFor.date - b.scheduledFor.date
      );

      // The next delivery is the first element in the sorted array
      const nextDelivery = sortedMealKits[0];

      // Convert the UNIX timestamp to a readable date
      const nextDeliveryDate = new Date(
        nextDelivery.scheduledFor.date * 1000
      ).toLocaleDateString("sv-SE", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      // Set the next delivery date
      setNextDeliveryDate(nextDeliveryDate);

      // SET SUBSCRIPTION FREQUENCY -------
      const { intervalCount, interval } =
        userDetails.data.subscription.price.schedule;
      if (intervalCount === 1 && interval === "week") {
        setSubscriptionFrequency("Varje vecka");
      } else if (intervalCount === 2 && interval === "week") {
        setSubscriptionFrequency("Varannan vecka");
        const { baseline } = userDetails.data.subscription;
        // Converting the baseline timestamp to a Date object
        const baselineDate: any = new Date(baseline * 1000);

        const baselineDateMilliseconds = baselineDate.getTime();
        const firstOfYearMilliseconds = new Date(
          baselineDate.getFullYear(),
          0,
          1
        ).getTime();
        const differenceInMilliseconds =
          baselineDateMilliseconds - firstOfYearMilliseconds;

        const weekNumber: any = Math.ceil(
          (differenceInMilliseconds / 86400000 + 1) / 7
        );

        // Determining if it's odd or even week
        setOddOrEvenSubscription(
          weekNumber % 2 === 0
            ? { string: "Jämna veckor", odd: false }
            : { string: "Udda veckor", odd: true }
        );
      } else if (intervalCount === 1 && interval === "month") {
        setSubscriptionFrequency("Varje månad");
      }
    };

    fetchUserDetails();
  }, [user]);

  const addMealkitToSubscription = async (deliveryWindow: DeliveryWindow) => {
    if (!user) return;
    if (!subscriptionDetails) return;
    try {
      const res = await instance.post(
        `subscription/${subscriptionDetails?.id}/mealkits`,
        {
          deliveryWindow: deliveryWindow,
        }
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const openAddMealkitModal = (week: number) => {
    setPostalCode(userDetails?.address.postalCode);
    setSubscriptionId(userDetails?.subscription.id);
    setWeek(week);
    onOpen();
  };

  return (
    <Section className="pt-10">
      <TitleH2>Hej {userDetails?.name}!</TitleH2>
      <BodyText>Du är inloggad som {user?.email}</BodyText>
      <button onClick={handleSignOut}>Logga ut</button>

      <div className="grid grid-cols-4 gap-6 mt-4">
        <MyPageTile
          className="col-span-2"
          title="Här är din nuvarande prenumerationsstatus:"
        >
          <div className="text-sm text-secondary">
            <div className="grid grid-cols-4 gap-4">
              <p className="font-poppins">Prenumeration:</p>
              <p className="col-span-2">{`${subscriptionFrequency} ${
                subscriptionFrequency == "Varannan vecka"
                  ? `(${oddOrEvenSubscription?.string})`
                  : ""
              }`}</p>
              <button className="col-span-1 text-right">Ändra</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <p className="font-poppins">Leveransdag:</p>
              <p className="col-span-2">
                {getDayStringFromNumber(prefferedDeliveryDay)}
                {"ar"}
                {/**TODO: Update */}
              </p>
              <button className="col-span-1 text-right">Ändra</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <p className="font-poppins">Leveransadress:</p>
              <p className="col-span-2">
                {`${deliveryInfo?.street}, ${deliveryInfo?.postalCode}, ${deliveryInfo?.city}`}
                {/**TODO: Update */}
              </p>
              <button className="col-span-1 text-right">Ändra</button>
            </div>
          </div>
        </MyPageTile>
        <MyPageTile className="col-span-2" title="Nästa planerade utkörning">
          <h1>{nextDeliveryDate}</h1>
        </MyPageTile>

        <MyPageTile className="col-span-4 grid grid-cols-3 gap-4">
          {/* <MealKitTile weekNumber={35} /> */}
          {upcomingMealkits.map((mealkit) => {
            var active = false;
            if (subscriptionDetails) {
              if (subscriptionDetails?.price.schedule.intervalCount === 1) {
                active = true;
                return;
              }
              if (subscriptionDetails?.price.schedule.intervalCount === 2) {
                if (mealkit.weekNumber % 2 === 0) {
                  if (oddOrEvenSubscription?.odd === false) {
                    active = true;
                  }
                } else {
                  if (oddOrEvenSubscription?.odd === true) {
                    active = true;
                  }
                }
              }
            } else {
              active = false;
            }

            return (
              <div key={mealkit.weekNumber}>
                <MealKitTile
                  weekNumber={mealkit.weekNumber}
                  active={active}
                  onAddMealkit={() => openAddMealkitModal(mealkit.weekNumber)}
                />
              </div>
            );
          })}
        </MyPageTile>
        {JSON.stringify(userDetails)}
      </div>
    </Section>
  );
};

export default MyPageContent;

interface MyPageTileProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}

const MyPageTile: React.FC<MyPageTileProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <div
      className={twMerge(
        `bg-primary shadow-inner bg-opacity-40 rounded-md p-4`,
        className
      )}
    >
      {title && (
        <h3 className="font-poppins text-sm text-secondary mb-2">{title}</h3>
      )}
      {children}
    </div>
  );
};

const MealKitTile: React.FC<{
  weekNumber: number;
  id?: string;
  portions?: number;
  nrRecipes?: number;
  onChange?: () => void;
  onPause?: () => void;
  onAddMealkit?: (week: number) => void;
  active?: boolean;
}> = ({
  weekNumber,
  id = "",
  portions,
  nrRecipes,
  onChange,
  onPause,
  onAddMealkit = (week) => {
    toast.error("Not implemented yet");
  },
  active,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const fetchRecipesForWeek = async () => {
    try {
      const response = await fetch("/api/recipes/for-week-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weekNumber: weekNumber }),
      });

      if (response.ok) {
        const recipes = await response.json();
        console.log("recipes", recipes);
        setRecipes(recipes);
      } else {
        console.log(
          "Failed to fetch recipes:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchRecipesForWeek();
  }, []);

  return (
    <div className="bg-primary-200 drop-shadow rounded-md p-4 h-full">
      <div
        className={twMerge(
          `h-full flex flex-col justify-between`,
          !active && "cursor-none pointer-events-none"
        )}
      >
        <h3 className="font-poppins text-sm text-secondary mb-2">{`Matkasse v.${weekNumber}`}</h3>
        {recipes.length > 2 ? (
          <div className="grid grid-cols-3 gap-2">
            {recipes.map((recipe: Recipe) => {
              return <RecipeTile key={recipe.slug} recipe={recipe} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-secondary">
              Recepten är inte ännu satta
            </p>
          </div>
        )}
        <div className="w-full flex justify-between mt-4">
          <div></div>
          <div className="flex gap-2">
            <button
              onClick={onChange}
              className="px-4 py-1 border border-secondary rounded-md text-sm font-bold text-secondary"
            >
              Ändra
            </button>
            <button
              onClick={onPause}
              className="px-4 py-1 border border-secondary rounded-md text-sm font-bold text-secondary"
            >
              Pausa
            </button>
          </div>
        </div>
      </div>
      {!active && (
        <div className="absolute top-0 left-0 rounded-md w-full h-full bg-primary-200 bg-opacity-90 flex flex-col justify-center items-center">
          <p className="font-poppins text-secondary text-sm text-center">
            Matkassen vecka {weekNumber} ingår inte i din prenumeration.
          </p>
          <button
            onClick={() => onAddMealkit(weekNumber)}
            className="border rounded-md font-bold border-secondary px-6 py-1 text-sm text-secondary mt-6"
          >
            Lägg till
          </button>
        </div>
      )}
    </div>
  );
};

const RecipeTile = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={`/recept/${recipe.slug}`} className="flex flex-col">
      <Image
        height={100}
        width={140}
        className="w-full h-20 object-cover overflow-hidden rounded-md"
        src={recipe.image.url}
        alt={recipe.title}
      />
      <p className="text-xs truncate w-full mt-2 font-poppins">
        {recipe.title}
      </p>
    </Link>
  );
};
