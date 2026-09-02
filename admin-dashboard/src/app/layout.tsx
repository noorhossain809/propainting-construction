import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/Providers";
import { GoogleOAuthProvider } from "@react-oauth/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | Pro Painting Construction",
    template: "%s | Pro Painting Construction Admin",
  },
  description: "Admin dashboard for managing Pro Painting Construction's website content, including projects, services, and site settings.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <ReduxProvider>{children}</ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
