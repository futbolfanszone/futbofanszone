import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { BRAND } from "@/lib/brand";
import { SITE } from "@/lib/constants";
import "./globals.css";

const fieldGothic = localFont({
  src: [
    {
      path: "../fonts/field-gothic/FieldGothic-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/field-gothic/FieldGothic-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/field-gothic/FieldGothic-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/field-gothic/FieldGothic-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-field-gothic",
  display: "swap",
});

const tacOne = localFont({
  src: "../fonts/tac-one/TacOne-Regular.ttf",
  variable: "--font-tac-one",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: "/favicon.png",
    apple: BRAND.assets.badgeLight,
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    images: [BRAND.assets.logoLight],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fieldGothic.variable} ${tacOne.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
