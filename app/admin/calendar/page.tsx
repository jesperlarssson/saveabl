import getAllMealkits from "@/actions/getAllMealkits";
import Calendar from "./components/Calendar";

import Section from "@/components/ui/Section";
import getAllDeliveries from "@/actions/getAllDeliveries";
import getRecurringPricesWithProducts from "@/actions/getRecurringPricesWithProducts";

const CalendarView = async () => {
//   const mealkits: Mealkit[] = await getAllMealkits();
//   const deliveries: Delivery[] = await getAllDeliveries();
//   const productOptions = await getRecurringPricesWithProducts();
  return (
    <Section className="pt-10">
      {/* <Calendar
        mealkits={mealkits}
        deliveries={deliveries}
        productOptions={productOptions}
      /> */}
    </Section>
  );
};

export default CalendarView;
