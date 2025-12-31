"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartContext";
import { useLang } from "@/hooks/useLang";
import { useState } from "react";
import Title from "@/components/ui/Title"; // ✅ samma som vanliga checkouten

type CartPreviewProps = {
  open: boolean;
  onClose: () => void;
};

const CartPreview = ({ open, onClose }: CartPreviewProps) => {
  const router = useRouter();
  const { items, clearCart, removeItem, increaseQuantity, decreaseQuantity } =
    useCart();
  const { text } = useLang();

  const [isRedirectingToStripe, setIsRedirectingToStripe] = useState(false);

  if (!open) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  const handleGoToCheckout = async () => {
    const hasMealKit = items.some((i) => i.id === "mealkit");
    const hasOnlyFarmShop = items.length > 0 && !hasMealKit;

    // 🧺 ENDAST gårdsbutik -> direkt till Stripe
    if (hasOnlyFarmShop) {
      try {
        setIsRedirectingToStripe(true);

        /**
         * CUSTOMER / EMAIL – förklaring:
         * - Om användaren inte är inloggad har vi ingen email här.
         *   Stripe Checkout kommer då be om email och skapa (eller matcha) kund.
         * - Om användaren är inloggad kan man i framtiden skicka customerId/email
         *   och återanvända befintlig Stripe-customer för att minska dubletter.
         */

        const res = await fetch("/api/farmshop-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              priceId: i.priceId,
              quantity: i.quantity,
            })),
          }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok || !data?.url) {
          console.error("Farmshop checkout failed", res.status, data);
          setIsRedirectingToStripe(false);
          onClose();
          router.push("/bestall?fromCart=1");
          return;
        }

       

        // Viktigt: stäng INTE modalen här – annars hinner man se gårdsbutikssidan innan redirect
        window.location.href = data.url;
        return;
      } catch (e) {
        console.error("Farmshop checkout error", e);
        setIsRedirectingToStripe(false);
        onClose();
        router.push("/bestall?fromCart=1");
        return;
      }
    }

    // ✅ Matkasse (eller mix) -> nuvarande flöde
    onClose();
    router.push("/bestall?fromCart=1");
  };

  return (
    <div
      className="
        fixed inset-0 z-[10000] bg-black/40
        flex items-center justify-center
        md:items-stretch md:justify-end
      "
    >
      <div
        className="
          relative z-[10001]
          bg-primary-200 shadow-xl flex flex-col
          w-[90%] max-w-sm max-h-[90vh] rounded-2xl
          md:w-96 md:max-w-none md:h-full md:max-h-none md:rounded-none
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20">
          <h2 className="text-lg font-semibold text-[#6E2936]">
            {text.cart.title}
          </h2>
          <button
            onClick={onClose}
            disabled={isRedirectingToStripe}
            className={`text-2xl leading-none text-[#6E2936] hover:opacity-70 ${
              isRedirectingToStripe ? "opacity-40 cursor-not-allowed" : ""
            }`}
            aria-label={text.cart.close_aria}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-gray-700">{text.cart.empty}</p>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}_${item.priceId}`}
                className="flex items-center gap-3 border-b border-primary/10 pb-3"
              >
                {item.image && (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#FCF7E8] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#6E2936]">
                    {item.name}
                  </p>

                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-700">
                    <div className="inline-flex items-center gap-1 border border-primary/20 rounded-full px-2 py-0.5">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={isRedirectingToStripe}
                        className="px-1 text-sm leading-none text-[#6E2936]"
                        aria-label={text.cart.decrease_aria}
                      >
                        −
                      </button>
                      <span className="px-1 text-[11px] min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        disabled={isRedirectingToStripe}
                        className="px-1 text-sm leading-none text-[#6E2936]"
                        aria-label={text.cart.increase_aria}
                      >
                        +
                      </button>
                    </div>

                    <span>
                      {text.cart.unit_price_prefix} {item.price} kr
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-semibold text-[#6E2936]">
                    {item.quantity * (item.price ?? 0)} kr
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={isRedirectingToStripe}
                    className="text-[11px] text-gray-600 hover:text-[#6E2936]"
                  >
                    {text.cart.remove_button}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-primary/20 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-800">
              {text.cart.total_label}
            </span>
            <span className="font-semibold text-[#6E2936]">
              {totalPrice} kr
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleGoToCheckout}
              disabled={items.length === 0 || isRedirectingToStripe}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold text-white bg-[#6E2936] hover:bg-[#5a2430] transition ${
                items.length === 0 || isRedirectingToStripe
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              {isRedirectingToStripe
                ? (text?.order?.loading ?? "Laddar...")
                : text.cart.checkout_button}
            </button>

            {items.length > 0 && (
              <button
                onClick={clearCart}
                disabled={isRedirectingToStripe}
                className="px-4 rounded-full py-2.5 text-xs font-medium text-[#6E2936] border border-[#6E2936] hover:bg-[#FCF7E8] transition"
              >
                {text.cart.clear_button}
              </button>
            )}
          </div>
        </div>

        {/* ✅ Global overlay – exakt samma som i vanliga checkouten */}
        {isRedirectingToStripe && (
          <div
            className="fixed inset-0 z-[10002] bg-primary bg-opacity-70 flex justify-center items-center"
            role="alert"
            aria-live="assertive"
          >
            <Title>{text?.order?.loading ?? "Laddar..."}</Title>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPreview;
