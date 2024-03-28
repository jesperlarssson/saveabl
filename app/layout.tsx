import "./globals.css";
import { Figtree } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import "swiper/css";
import Script from "next/script";
import { isMobile } from "react-device-detect";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import MyParallaxProvider from "@/providers/MyParallaxProvider";
import PromotionBanner from "@/components/ui/PromotionBanner";
import ModalProvider from "@/providers/ModalProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { RecipeProvider } from "@/providers/RecipeProvider";
import { GeoProvider } from "@/providers/GeoProvider";
import { CheckoutProvider } from "@/providers/CheckoutProvider";
import CheckoutBasket from "@/components/section/CheckoutBasket";
import { LangProvider } from "@/providers/LangProvider";
import MetaPixel from "@/components/MetaPixel";

const font = Figtree({ subsets: ["latin"] });
export const revalidate = 1; // revalidate this page every 60 seconds

export const metadata = {
  title: "Saveabl",
  description: "Matkassar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <head>
        <MetaPixel pixelId="995084671596511" />
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
      </head>
      <body className={font.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PBCCL8GC"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <GeoProvider>
          <LangProvider>
            <AuthProvider>
              <CheckoutProvider>
                <ToasterProvider />
                <ModalProvider />
                <MyParallaxProvider>
                  <RecipeProvider>
                    <PromotionBanner />
                    <Navbar />

                    <main className="min-h-screen overflow-x-hidden">
                      {children}
                    </main>

                    <Footer />
                  </RecipeProvider>
                </MyParallaxProvider>
                <CheckoutBasket />
              </CheckoutProvider>
            </AuthProvider>
          </LangProvider>
        </GeoProvider>
      </body>
    </html>
  );
}
