"use client";

import Image from "next/image";
import Section from "../ui/Section";
import { useLang } from "@/hooks/useLang";
import Button from "../ui/Button";
import { useState } from "react";
import type { FarmShopProduct } from "@/lib/hygraph";
import { useCart } from "@/providers/CartContext";

type Props = {
  products: FarmShopProduct[];
  nextWeekProducts: FarmShopProduct[];
};

/* ---------------- LANGUAGE MAPPING ---------------- */

const mapLangToLocalePrefix = (lang?: string) => {
  if (!lang) return "en";
  const lower = lang.toLowerCase();
  if (lower.startsWith("sv")) return "sv";
  if (lower.startsWith("da")) return "da";
  return "en";
};

const applyLocalization = (
  product: FarmShopProduct,
  lang?: string
): FarmShopProduct => {
  const localePrefix = mapLangToLocalePrefix(lang);

  const loc = product.localizations?.find((l) =>
    l.locale?.toLowerCase().startsWith(localePrefix)
  );
  

  return {
    ...product,
    title: loc?.title ?? product.title,
    description: loc?.description ?? product.description,
    price: loc?.price ?? product.price,
  };
};

/* ---------------- COMPONENT ---------------- */

const FarmShopProductsSectionClient = ({ products, nextWeekProducts }: Props) => {
  const { text, lang } = useLang();
  const [showAll, setShowAll] = useState(false);

  const { addItem, items } = useCart();

  /* ---------------- REQUEST PRODUCTS (NEW) ---------------- */

  // (för att TS inte ska gnälla om dina nya fält inte finns i typen)
  type FarmShopProductWithRequest = FarmShopProduct & {
    productType?: string | null;
    requestType?: string | null;
  };

  const isRequestProduct = (p: FarmShopProduct) =>
    (p as FarmShopProductWithRequest).productType === "REQUEST";

  const isDoubleUpRequest = (p: FarmShopProduct) =>
    (p as FarmShopProductWithRequest).requestType === "DOUBLE_UP";

  // ✅ Double up modal state
  const [doubleUpOpen, setDoubleUpOpen] = useState(false);
  const [doubleUpProduct, setDoubleUpProduct] =
    useState<FarmShopProduct | null>(null);
  const [doubleUpEmail, setDoubleUpEmail] = useState("");
  const [doubleUpWish, setDoubleUpWish] = useState("");
  const [doubleUpLoading, setDoubleUpLoading] = useState(false);
  const [doubleUpDone, setDoubleUpDone] = useState(false);

  // ✅ För custom placeholders
  const [doubleUpEmailFocused, setDoubleUpEmailFocused] = useState(false);
  const [doubleUpWishFocused, setDoubleUpWishFocused] = useState(false);

  const openDoubleUpModal = (product: FarmShopProduct) => {
    setDoubleUpProduct(product);
    setDoubleUpEmail("");
    setDoubleUpWish("");
    setDoubleUpDone(false);
    setDoubleUpOpen(true);
  };

  const handleSubmitDoubleUp = async () => {
    if (!doubleUpProduct) return;

    try {
      setDoubleUpLoading(true);

      const res = await fetch("/api/farmshop-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "DOUBLE_UP",
          productId: doubleUpProduct.id,
          productTitle: doubleUpProduct.title,
          email: doubleUpEmail,
          wish: doubleUpWish,
          locale: lang,
          source: "farmshop",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("farmshop-request failed", res.status, data);
        return;
      }

      setDoubleUpDone(true);
    } catch (e) {
      console.error("farmshop-request error", e);
    } finally {
      setDoubleUpLoading(false);
    }
  };

  /* ---------------- EXISTING: NOTIFY MODAL ---------------- */

  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyProduct, setNotifyProduct] =
    useState<FarmShopProduct | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [notifyDone, setNotifyDone] = useState(false);

  const [notifyEmailFocused, setNotifyEmailFocused] = useState(false);

  const handleAddToCart = (product: FarmShopProduct) => {
    if (!product.stripePriceId) {
      console.warn("Farm shop product missing stripePriceId", product);
      return;
    }

    addItem({
      id: product.id,
      name: product.title,
      priceId: product.stripePriceId,
      price: product.price ?? 0,
      image: product.image?.url,
    });
  };

  const handleNotifyMe = async (product: FarmShopProduct, email: string) => {
    try {
      setNotifyLoading(true);

      const res = await fetch("/api/back-in-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          productId: product.id,
          productTitle: product.title,
          locale: lang,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Failed to save signup", res.status, data);
        return;
      }

      setNotifyDone(true);
    } catch (e) {
      console.error("Notify request failed", e);
    } finally {
      setNotifyLoading(false);
    }
  };

  const isInCart = (id: string) => items.some((i) => i.id === id);

  // Apply language localization
  const localizedProducts = (products || []).map((p) =>
    applyLocalization(p, lang)
  );
  const localizedNextWeekProducts = (nextWeekProducts || []).map((p) =>
    applyLocalization(p, lang)
  );

  const mainProducts = localizedProducts;
  const nextWeekList = localizedNextWeekProducts;

  let nextWeekGridCols = "grid-cols-1";
  if (nextWeekList.length === 2) {
    nextWeekGridCols = "grid-cols-2";
  } else if (nextWeekList.length >= 3) {
    nextWeekGridCols = "grid-cols-2 md:grid-cols-3";
  }

  const productsToShow =
  typeof window !== "undefined" && window.innerWidth < 768
    ? showAll
      ? mainProducts
      : mainProducts.slice(0, 4)
    : showAll
    ? mainProducts
    : mainProducts.slice(0, 3);


      const nextWeekTitleImage =
    lang?.toLowerCase().startsWith("en")
      ? "/images/farmshop-nextweek-title-en.svg"
      : "/images/farmshop-nextweek-title.svg";


  if (!mainProducts.length && !nextWeekList.length) return null;

  return (
    <div className="w-full bg-[#EECFAA]">
      <Section className="py-20 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* ---------------- HEADER ---------------- */}
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#6E2936] mb-4">
              {text.farmshop_products.heading}
            </h2>

            <p className="text-md md:text-lg text-gray-800 max-w-xl mx-auto mb-6 md:mb-10">
              {text.farmshop_products.description}
            </p>
          </div>

          {/* ---------------- MAIN PRODUCTS ---------------- */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {productsToShow.map((product) => {
              const buttonBase =
                "mt-auto text-xs md:text-base font-semibold rounded-full py-2 px-3 w-full text-center transition-colors duration-200 border";

              const buttonStyle = product.soldOut
                ? "bg-transparent border-[#6E2936] text-[#6E2936] opacity-90 cursor-pointer hover:bg-[#FCF7E8]"
                : "bg-[#6E2936] text-white border-transparent hover:bg-[#FCF7E8] hover:text-[#6E2936] hover:border-[#6E2936] active:scale-[0.98]";

              const isRequest = isRequestProduct(product);

              const buttonLabel = product.soldOut
                ? text.farmshop_products.sold_out
                : isRequest
                ? text.farmshop_requests.double_up_cta
                : text.farmshop_products.add_to_cart;
                


              return (
                <article
                  key={product.id}
                  className="bg-[#FCF7E8] rounded-2xl p-3 flex flex-col h-full"
                >
                  <div className="relative w-full aspect-[7/5] mb-3 overflow-hidden rounded-xl">
                    <Image
                      src={product.image?.url || "/images/placeholder.jpg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col text-center">
                     <div className="px-2 md:px-3">
                    <p className="font-semibold text-sm md:text-lg mb-1 text-[#6E2936]">
                      {product.title}
                    </p>

                    <p className="text-sm md:text-base text-gray-700 mb-2">
                      {product.description}
                    </p>

                    {product.price != null && (
                      <p className="text-sm md:text-base font-semibold mb-3">
                        {product.price} kr
                      </p>
                    )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (product.soldOut) {
                          setNotifyProduct(product);
                          setNotifyEmail("");
                          setNotifyDone(false);
                          setNotifyOpen(true);
                          return;
                        }

                        // ✅ REQUEST products -> open modal (never add to cart)
                        if (isRequestProduct(product)) {
                          if (isDoubleUpRequest(product)) {
                            openDoubleUpModal(product);
                            return;
                          }
                          console.warn("Unknown request product", product);
                          return;
                        }

                        // ✅ normal Stripe product
                        handleAddToCart(product);
                      }}
                      className={`${buttonBase} ${buttonStyle}`}
                    >
                      {buttonLabel}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ---------------- SHOW MORE / HIDE BUTTON ---------------- */}
          {mainProducts.length > 3 && (
            <div className="flex justify-center mt-10 md:mt-14">
              <Button
                className="w-full md:w-72 bg-[#6E2936] text-white hover:bg-[#5a2430] flex items-center justify-center gap-2"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll
                  ? text.farmshop_products.cta_hide
                  : text.farmshop_products.cta_more}
              </Button>
            </div>
          )}

          {/* ---------------- NEXT WEEK PRODUCTS ---------------- */}
          {nextWeekList.length > 0 && (
            <div className="mt-12 w-full flex justify-center">
              <div className="inline-block">
                <div className="mb-0">
                  <Image
  src={nextWeekTitleImage}
  alt={text.farmshop_products.next_week_title_alt}
  width={460}
  height={240}
  className="h-auto w-[260px] md:w-[380px]"
/>

                </div>

                <div className={`grid gap-4 md:gap-6 ${nextWeekGridCols}`}>
                  {nextWeekList.map((product) => {
                    const hasPrice = product.price != null;

                    const buttonBase =
                      "mt-auto text-xs md:text-base font-semibold rounded-full py-2 px-3 w-full text-center transition-colors duration-200 border";

                    const buttonStyle = product.soldOut
                      ? "bg-transparent border-[#6E2936] text-[#6E2936] opacity-90 cursor-pointer hover:bg-[#FCF7E8]"
                      : "bg-[#6E2936] text-white border-transparent hover:bg-[#FCF7E8] hover:text-[#6E2936] hover:border-[#6E2936] active:scale-[0.98]";

                    const isRequest = isRequestProduct(product);

                    const buttonLabel = product.soldOut
                      ? text.farmshop_products.sold_out
                      : isRequest
                      ? text.farmshop_requests.double_up_cta
                      : text.farmshop_products.add_to_cart;

                    return (
                      <article
                        key={product.id}
                        className={`
    bg-[#FCF7E8]
    rounded-2xl
    p-3
    flex flex-col
    h-full
    ${!hasPrice ? "min-h-[360px] md:min-h-[420px]" : ""}
  `}
>
                        <div className="relative w-full aspect-[7/5] mb-3 overflow-hidden rounded-xl">
                          <Image
                            src={product.image?.url || "/images/placeholder.jpg"}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col text-center">
                          <div className="px-2 md:px-3">
                          <p className="font-semibold text-sm md:text-lg mb-1 text-[#6E2936]">
                            {product.title}
                          </p>

                          <p className="text-sm md:text-base text-gray-700 mb-2">
                            {product.description}
                          </p>

                          {product.price != null && (
                            <p className="text-sm md:text-base font-semibold mb-3">
                              {product.price} kr
                            </p>
                          )}
                          </div>
                          <div className={`mt-auto ${!hasPrice ? "pt-4" : "pt-0"}`}>
                          <button
                            type="button"
                            onClick={() => {
                              if (product.soldOut) {
                                setNotifyProduct(product);
                                setNotifyEmail("");
                                setNotifyDone(false);
                                setNotifyOpen(true);
                                return;
                              }

                              if (isRequestProduct(product)) {
                                if (isDoubleUpRequest(product)) {
                                  openDoubleUpModal(product);
                                  return;
                                }
                                console.warn("Unknown request product", product);
                                return;
                              }

                              handleAddToCart(product);
                            }}
                            className={`${buttonBase} ${buttonStyle}`}
                          >
                            {buttonLabel}
                          </button>
                        </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- NOTIFY MODAL ---------------- */}
          {notifyOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              onClick={() => setNotifyOpen(false)}
            >
              <div
                className="relative w-full max-w-md rounded-2xl bg-[#FCF7E8] p-5 md:p-6 border border-[#6E2936]/20 shadow-lg font-poppins"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label={text.notify.close_aria}
                  onClick={() => setNotifyOpen(false)}
                  className="absolute right-4 top-4 text-[#6E2936] opacity-70 hover:opacity-100 transition"
                >
                  ✕
                </button>

                {!notifyDone && (
                  <p className="text-lg md:text-xl font-semibold text-[#6E2936] mb-1">
                    {text.notify.title}
                  </p>
                )}

                {!notifyDone && (
                  <p className="text-sm md:text-base text-gray-700 mb-4">
                    {text.notify.description_prefix}{" "}
                    <span className="font-semibold text-gray-700">
                      {notifyProduct?.title}
                    </span>{" "}
                    {text.notify.description_suffix}
                  </p>
                )}

                {notifyDone ? (
                  <div className="flex flex-col items-center justify-center text-center py-7">
                    <p className="text-lg font-semibold text-[#6E2936] mb-2">
                      {text.notify.thanks_title}
                    </p>
                    <p className="text-sm md:text-base text-gray-700 max-w-xs">
                      {text.notify.thanks_text}
                    </p>
                  </div>
                ) : (
                  <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!notifyProduct) return;
                      handleNotifyMe(notifyProduct, notifyEmail);
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#6E2936]">
                        {text.notify.email_label}
                      </label>

                      <div className="relative">
                        <input
                          value={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.value)}
                          onFocus={() => setNotifyEmailFocused(true)}
                          onBlur={() => setNotifyEmailFocused(false)}
                          type="email"
                          placeholder=""
                          className="
                            w-full
                            border border-[#6E2936]/40
                            bg-transparent
                            px-3 py-2.5
                            rounded-md
                            text-sm md:text-base
                            text-[#6E2936]
                            focus:border-[#6E2936]
                            focus:outline-none
                            font-poppins
                          "
                        />

                        {!notifyEmail && !notifyEmailFocused && (
                          <span
                            className="font-poppins pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs md:text-base"
                            style={{ color: "rgba(110, 41, 54, 0.55)" }}
                          >
                            {text.notify.email_placeholder}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full flex justify-center pt-1">
                      <Button
                        type="submit"
                        className="w-full md:w-72 py-2 text-sm md:text-sm font-semibold"
                        disabled={notifyLoading || !notifyEmail.includes("@")}
                        aria-label={text.notify.submit}
                      >
                        {notifyLoading ? text.notify.sending : text.notify.submit}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ---------------- DOUBLE UP MODAL (NEW) ---------------- */}
          {doubleUpOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              onClick={() => setDoubleUpOpen(false)}
            >
              <div
                className="relative w-full max-w-md rounded-2xl bg-[#FCF7E8] p-5 md:p-6 border border-[#6E2936]/20 shadow-lg font-poppins"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label={text.farmshop_requests.close_aria}
                  onClick={() => setDoubleUpOpen(false)}
                  className="absolute right-4 top-4 text-[#6E2936] opacity-70 hover:opacity-100 transition"
                >
                  ✕
                </button>

                {doubleUpDone ? (
                  <div className="flex flex-col items-center justify-center text-center py-7">
                    <p className="text-lg font-semibold text-[#6E2936] mb-2">
                      {text.farmshop_requests.thanks_title}
                    </p>
                    <p className="text-sm md:text-base text-gray-700 max-w-xs">
                      {text.farmshop_requests.thanks_text}
                    </p>
                  </div>
                ) : (
                  <form
                    className="w-full flex flex-col gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitDoubleUp();
                    }}
                  >
                    <p className="text-lg md:text-xl font-semibold text-[#6E2936]">
                      {text.farmshop_requests.double_up_title}
                    </p>

                    <p className="text-sm md:text-base text-gray-700">
                      {text.farmshop_requests.double_up_description_1}
                    </p>

                    <p className="text-sm md:text-base text-gray-700 mb-4">
                      {text.farmshop_requests.double_up_description_2}
                    </p>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#6E2936]">
                        {text.farmshop_requests.wish_label}
                      </label>

                      <div className="relative">
                        <textarea
                          value={doubleUpWish}
                          onChange={(e) => setDoubleUpWish(e.target.value)}
                          onFocus={() => setDoubleUpWishFocused(true)}
                          onBlur={() => setDoubleUpWishFocused(false)}
                          placeholder=""
                          rows={4}
                          className="
                            w-full
                            border border-[#6E2936]/40
                            bg-transparent
                            px-3 py-2.5
                            rounded-md
                            text-sm md:text-base
                            text-[#6E2936]
                            focus:border-[#6E2936]
                            focus:outline-none
                            font-poppins
                            resize-none
                          "
                        />

                        {!doubleUpWish && !doubleUpWishFocused && (
                          <span
                            className="font-poppins pointer-events-none absolute left-3 top-3 text-xs md:text-base"
                            style={{ color: "rgba(110, 41, 54, 0.55)" }}
                          >
                            {text.farmshop_requests.wish_placeholder}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#6E2936]">
                        {text.farmshop_requests.email_label}
                      </label>

                      <div className="relative">
                        <input
                          value={doubleUpEmail}
                          onChange={(e) => setDoubleUpEmail(e.target.value)}
                          onFocus={() => setDoubleUpEmailFocused(true)}
                          onBlur={() => setDoubleUpEmailFocused(false)}
                          type="email"
                          placeholder=""
                          className="
                            w-full
                            border border-[#6E2936]/40
                            bg-transparent
                            px-3 py-2.5
                            rounded-md
                            text-sm md:text-base
                            text-[#6E2936]
                            focus:border-[#6E2936]
                            focus:outline-none
                            font-poppins
                          "
                        />

                        {!doubleUpEmail && !doubleUpEmailFocused && (
                          <span
                            className="font-poppins pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs md:text-base"
                            style={{ color: "rgba(110, 41, 54, 0.55)" }}
                          >
                            {text.farmshop_requests.email_placeholder}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full flex justify-center pt-1">
                      <Button
                        type="submit"
                        className="w-full md:w-72 py-2 text-sm md:text-sm font-semibold mt-4"
                        disabled={
                          doubleUpLoading ||
                          !doubleUpEmail.includes("@") ||
                          doubleUpWish.trim().length < 2
                        }
                        aria-label={text.farmshop_requests.submit_aria}
                      >
                        {doubleUpLoading
                          ? text.farmshop_requests.sending
                          : text.farmshop_requests.submit}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default FarmShopProductsSectionClient;
