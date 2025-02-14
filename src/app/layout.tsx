import type { Metadata } from "next";
import { roboto, jeju, roadRage } from "@/lib/font";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Ticketly",
  description: "Simple and easy ticket generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${jeju.variable} ${roadRage.variable} min-h-screen bg-base relative`}>
        <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[50vh] bg-[radial-gradient(50%_75%_at_50%_100%,rgba(36,160,181,0.2)_0%,rgba(36,160,181,0)_100%)]" />
        <Navbar />
        { children }
        <Toaster richColors/>
      </body>
    </html>
  );
}
