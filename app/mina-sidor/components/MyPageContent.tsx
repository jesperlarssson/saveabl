"use client";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/SignOutButton";
import { useAuth } from "@/hooks/useAuth";

import { Delivery } from "@/types";

interface MyPageContentProps {
  deliveries: Delivery[];
}

const MyPageContent: React.FC<MyPageContentProps> = ({ deliveries }) => {
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user } = auth;

  if (!user) {
    redirect("/logga-in");
  }

  function formatEpochToSwedishLocalTime(epoch: number | undefined): string {
    if (!epoch) {
      return "Misslyckades att hämta datum";
    }

    // Convert the epoch time to milliseconds (since JavaScript uses milliseconds)
    let date = new Date(epoch * 1000);

    // Format the date and time according to the Swedish locale
    let formatted = date.toLocaleString("sv-SE", {
      timeZone: "Europe/Stockholm",
    });

    return formatted;
  }

  return (
    <div>
      {deliveries.map((delivery) => {
        return (
          <div key={delivery.id}>
            <p>{delivery.selectedWeekDayName}</p>
            <p>{delivery.selectedWeekDay}</p>
            <p>{delivery.mealkits?.name}</p>
            <p>{delivery.mealkits?.description}</p>
            <p>{delivery.mealkits?.products?.name}</p>
            <p>
              {`Avboka senast: ${formatEpochToSwedishLocalTime(
                delivery.mealkits?.cut_off_time
              )}`}
            </p>
          </div>
        );
      })}
      <SignOutButton />
    </div>
  );
};

export default MyPageContent;
