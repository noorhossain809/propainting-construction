import type { Metadata } from "next";
import { Manrope, Open_Sans, Teko } from "next/font/google";
import "./globals.css";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import MotionLayout from "./MotionLayout";
import ReduxProvider from "@/redux/Providers";
import GlobalLoader from "@/components/ui/GlobalLoader";

const geistManrope = Manrope({
  variable: "--font-geist-manrope",
  subsets: ["latin"],
});

const geistOpenSans = Open_Sans({
  variable: "--font-geist-open-sans",
  subsets: ["latin"],
});
const geistTeko = Teko({
  variable: "--font-geist-teko",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pro Painting Construction - New York, USA Services",
  description: "Leading painting and construction company based in New York, USA. We specialize in transforming spaces with professional care and expertise.",
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://propaintconstruction.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistManrope.variable} ${geistTeko.variable} ${geistOpenSans.variable} antialiased`}
      >
        <ReduxProvider>
          <GlobalLoader />
          <Header />

          <MotionLayout>{children}</MotionLayout>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
