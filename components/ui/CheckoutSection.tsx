import Title from "./Title";

const CheckoutSection = ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => {
    return (
      <div className="my-4 py-4 border-b border-primary-600 border-opacity-50 flex flex-col items-center text-neutral-700 max-w-4xl w-full ">
        <Title className="col-span-2">{title}</Title>
        <div className="col-span-3">{children}</div>
      </div>
    );
  };

  export default CheckoutSection;