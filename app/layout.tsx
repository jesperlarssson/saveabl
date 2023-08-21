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
import { TextProvider } from "@/providers/TextProvider";

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
      <body className={font.className}>
        <GeoProvider>
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
        </GeoProvider>
      </body>
    </html>
  );
}
