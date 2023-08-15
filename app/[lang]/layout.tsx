import "./globals.css";
import { Figtree } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import "swiper/css";

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
import { Locale, i18n } from "@/i18n.config";

const font = Figtree({ subsets: ["latin"] });
export const revalidate = 1; // revalidate this page every 60 seconds

export const metadata = {
  title: "Saveabl",
  description: "Matkassar",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={font.className}>
        <GeoProvider>
          <AuthProvider>
            <CheckoutProvider>
              <ToasterProvider />
              <ModalProvider />
              <MyParallaxProvider>
              <RecipeProvider lang={params.lang}>
                  <PromotionBanner />
                  <Navbar lang={params.lang} />

                  <main className="min-h-screen overflow-x-hidden">
                    {children}
                  </main>

                  <Footer />
                </RecipeProvider>
              </MyParallaxProvider>
              <CheckoutBasket />
            </CheckoutProvider>
          </AuthProvider>
        </GeoProvider>
      </body>
    </html>
  );
}
