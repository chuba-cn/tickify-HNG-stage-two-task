import { Roboto,Road_Rage } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "400"
});

export const jeju = localFont({
  src: "../app/fonts/jejumyeongjo-regular-webfont.woff",
  variable: "--font-jeju",
  weight: "400",
});

export const roadRage = Road_Rage({
  subsets: [ "latin" ],
  variable: "--font-road-rage",
  weight: "400"
})
