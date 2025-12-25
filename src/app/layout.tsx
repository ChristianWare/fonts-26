import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "../components/shared/SmoothScroll/SmoothScroll";

const SuisseIntlRegular = localFont({
  src: "../../public/fonts/SuisseIntlRegular.otf",
  variable: "--SuisseIntlRegular",
  display: "swap",
});

const SuisseIntlMedium = localFont({
  src: "../../public/fonts/SuisseIntlMedium.woff2",
  variable: "--SuisseIntlMedium",
  display: "swap",
});

const SuisseIntlCondBold = localFont({
  src: "../../public/fonts/SuisseIntlCondBold.woff2",
  variable: "--SuisseIntlCondBold",
  display: "swap",
});



export const metadata: Metadata = {
  title: {
    default: "Fonts & Footers | Custom Booking Websites",
    template: "%s - Fonts & Footers",
  },
  description:
    "Fonts & Footers builds lightning-fast, mobile-first booking platforms that cut no-shows, and automate deposits for salons, spas, rentals, and service brands.",
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  // this will render:
  // <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${SuisseIntlCondBold.variable} ${SuisseIntlMedium.variable} ${SuisseIntlRegular.variable}`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
