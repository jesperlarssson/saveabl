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
import { useEffect, useState } from "react";
import { getWeekNumber } from "@/helpers/format";
import toast from "react-hot-toast";
import instance from "@/lib/apiAxios";
import { DeliveryWindow } from "@/providers/CheckoutProvider";
import useAddMealkitModal from "@/hooks/useAddMealkitModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useLang } from "@/hooks/useLang";
import Button from "@/components/ui/Button";
import axios from "axios";
import UserAccountComponent from "./UserAccountComponent";

const MyPageContent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [stripeResponse, setStripeResponse] = useState<any>(null);
  const [billingFrequency, setBillingFrequency] = useState<string>("weekly");
  const [isEvenWeek, setIsEvenWeek] = useState<boolean | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<{
    city: string;
    country: string;
    line1: string;
    postal_code: string;
  }>({
    city: "",
    country: "",
    line1: "",
    postal_code: "",
  });

  const auth = useAuth();

  const { user, signOut } = auth || {};

  const handleSignOut = () => {
    if (signOut) signOut();
  };

  const { lang, text } = useLang();

  const authModal = useAuthModal();

  const currentWeekNumber = getWeekNumber(new Date());

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

  const getUserDetailsFromStripe = async () => {
    try {
      const response = await axios.post("/api/customer-with-subscription", {
        email: user?.email,
      });
      const deliveryAddress = {
        city: response.data.customer.address.city,
        country: response.data.customer.address.country,
        line1: response.data.customer.address.line1,
        postal_code: response.data.customer.address.postal_code,
      };
      setDeliveryInfo(deliveryAddress);
      const subscriptionInfo = response.data.activeSubscriptions[0]; // Assuming first subscription is the relevant one
      setActiveSubscription(subscriptionInfo);
      const billingFrequency =
        subscriptionInfo.items.data[0].plan.interval_count === 1
          ? "weekly"
          : "bi-weekly";

      setBillingFrequency(billingFrequency);

      if (billingFrequency === "bi-weekly") {
        const startDate = new Date(subscriptionInfo.start_date * 1000); // Convert to milliseconds
        const startWeekNumber = getWeekNumber(startDate);
        const isEvenWeek = startWeekNumber % 2 === 0;
        setIsEvenWeek(isEvenWeek);
      } else {
        setIsEvenWeek(null);
      }

      setStripeResponse(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      authModal.onOpen();
    } else {
      getUserDetailsFromStripe();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center mt-10 ">
        <TitleH2>
          {text?.my_pages?.title_signed_out ?? "Du är inte inloggad"}
        </TitleH2>
        <BodyText>
          {text?.my_pages?.login_instruction ??
            "Logga in för att se information om dina beställningar."}
        </BodyText>
      </div>
    );
  }

  return (
    <Section className="pt-10">
      <TitleH2>{text?.my_pages?.greeting_prefix ?? "Hej!"}</TitleH2>
      <BodyText className="mb-10">
        {text?.my_pages?.signed_in_as_prefix ?? "Du är inloggad som"}{" "}
        {user?.email}
      </BodyText>

      <UserAccountComponent
        loading={loading}
        stripeResponse={stripeResponse}
        billingFrequency={billingFrequency}
        isEvenWeek={isEvenWeek}
        activeSubscription={activeSubscription}
        deliveryInfo={deliveryInfo}
      />
      <Button className="max-w-fit px-8 py-2 mt-4" onClick={handleSignOut}>
        {text?.my_pages?.sign_out_button ?? "Logga ut"}
      </Button>
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
  const { text } = useLang();
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
        <h3 className="font-poppins text-sm text-secondary mb-2">{`${
          text?.my_pages?.mealbox_week_prefix ?? "Matkasse v."
        }${weekNumber}`}</h3>
        {recipes.length > 2 ? (
          <div className="grid grid-cols-3 gap-2">
            {recipes.map((recipe: Recipe) => {
              return <RecipeTile key={recipe.slug} recipe={recipe} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-secondary">
              {text?.my_pages?.no_recipes_set ?? "Recepten är inte ännu satta"}
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
              {text?.my_pages?.change_mealbox_button ?? "Ändra"}
            </button>
            <button
              onClick={onPause}
              className="px-4 py-1 border border-secondary rounded-md text-sm font-bold text-secondary"
            >
              {text?.my_pages?.pause_mealbox_button ?? "Pausa"}
            </button>
          </div>
        </div>
      </div>
      {!active && (
        <div className="absolute top-0 left-0 rounded-md w-full h-full bg-primary-200 bg-opacity-90 flex flex-col justify-center items-center">
          <p className="font-poppins text-secondary text-sm text-center">
            {text?.my_pages?.not_in_subscription_prefix ?? "Matkassen vecka"}{" "}
            {weekNumber}{" "}
            {text?.my_pages?.not_in_subscription_suffix ??
              "ingår inte i din prenumeration."}
          </p>
          <button
            onClick={() => onAddMealkit(weekNumber)}
            className="border rounded-md font-bold border-secondary px-6 py-1 text-sm text-secondary mt-6"
          >
            {text?.my_pages?.add_to_subscription ?? "Lägg till"}
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
