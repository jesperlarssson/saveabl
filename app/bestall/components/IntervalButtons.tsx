import { AnimatePresence, motion } from "framer-motion";
import { CheckoutButton } from "./CheckoutButton";


interface Type {
    odd: boolean;
    even: boolean;
  }
  
  const variants = {
    open: { opacity: 1, height: "auto", y: 0 },
    closed: { opacity: 0, height: 0, y: -20 },
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
  