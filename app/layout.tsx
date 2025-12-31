"use client";

import "./globals.css";
import { Figtree } from "next/font/google";
import "swiper/css";
import Script from "next/script";
import { usePathname } from "next/navigation";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import MyParallaxProvider from "@/providers/MyParallaxProvider";
// import PromotionBanner from "@/components/ui/PromotionBanner";
import ModalProvider from "@/providers/ModalProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { RecipeProvider } from "@/providers/RecipeProvider";
import { GeoProvider } from "@/providers/GeoProvider";
import { CheckoutProvider } from "@/providers/CheckoutProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import MetaPixel from "@/components/MetaPixel";
import { LangProvider } from "@/providers/LangProvider";
import { PauseWeekProvider } from "@/context/PauseWeekContext";
import PopupManager from "@/app/popupManager";

// 🛒 CartProvider – gemensam varukorg för hela sidan
import { CartProvider } from "@/providers/CartContext";
// (Om du inte längre använder gamla CheckoutBasket kan du ta bort importen)
// import CheckoutBasket from "@/components/section/CheckoutBasket";

const font = Figtree({ subsets: ["latin"] });
export const revalidate = 1;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSthlmPage = pathname?.startsWith("/sthlm");

  return (
    <html lang="sv">
      <head>
        <MetaPixel pixelId="995084671596511" />

        <link rel="preload" as="image" href="/images/klimatsmart.webp" />
        <link rel="preload" as="image" href="/images/kockforberedd.webp" />
        <link rel="preload" as="image" href="/images/enkelt-gott.webp" />

        <Script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
             })(window,document,'script','dataLayer','GTM-PBCCL8GC');`,
          }}
        />

        <title>{"Gör din vardagsmatenkel och hållbar"}</title>
        <meta
          name="description"
          content="Matkassen där vi gör matlagningen och du sätter sista touchen, allt klart på 15 minuter."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta property="og:title" content="Gör din vardagsmat enkel och hållbar" />
        <meta
          property="og:description"
          content="Matkassen där vi gör matlagningen och du sätter sista touchen, allt klart på 15 minuter."
        />
        <meta property="og:image" content="https://saveabl.com/images/og-image.png" />
        <meta property="og:url" content="https://saveabl.com" />
      </head>

      <body className={font.className}>
        {/* GTM (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PBCCL8GC"
           height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />

        <GeoProvider>
          <PauseWeekProvider>
            <LangProvider>
              <AuthProvider>
                <CheckoutProvider>
                  {/* 🛒 Här inne delar hela appen samma varukorg */}
                  <CartProvider>
                    <ToasterProvider />
                    <ModalProvider />
                    <MyParallaxProvider>
                      <RecipeProvider>
                        {/* <PromotionBanner /> */}

                        <Navbar />

                        <main className="min-h-screen overflow-x-hidden pt-16 md:pt-20">
                          {children}
                        </main>

                        {!isSthlmPage && <PopupManager />}
                        <Footer />
                      </RecipeProvider>
                    </MyParallaxProvider>

                    {/* Om du fortfarande vill använda gamla CheckoutBasket, låt denna vara kvar
                        annars kan du ta bort den */}
                    {/* <CheckoutBasket /> */}
                  </CartProvider>
                </CheckoutProvider>
              </AuthProvider>
            </LangProvider>
          </PauseWeekProvider>
        </GeoProvider>
      </body>
    </html>
  );
}
