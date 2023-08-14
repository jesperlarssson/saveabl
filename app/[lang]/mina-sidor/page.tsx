import getDeliveriesByUserId from "@/actions/getDeliveriesByUserId";
import MyPageContent from "./components/MyPageContent";

const MinaSidor = async () => {
  const deliveries = await getDeliveriesByUserId();
  return (
    <div>
      <MyPageContent deliveries={deliveries} />
    </div>
  );
};

export default MinaSidor;
