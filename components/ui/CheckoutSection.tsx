import Title from "./Title";

const CheckoutSection = ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => {
    return (
      <div className="my-4 py-4 border-b border-primary-600 flex flex-col items-center lg:items-start lg:grid gap-4 grid-cols-3 text-neutral-700">
        <Title>{title}</Title>
        <div className="col-span-2">{children}</div>
      </div>
    );
  };

  export default CheckoutSection;