import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatifyAi",
  description: "Math solving,reimagined on canvas.",
 icons:{
  icon:"/icon.svg"
 },
 openGraph:{
  title:"MatifyAi",
  description:"Math solving,reimagined on canvas.",
  url:"https://matifyai.vercel.app",
  images:[
    {
      url:"/icon.svg",
      width:800,
      height:600,
      alt:"MatifyAi Logo"
    }
  ],
  siteName:"MatifyAi",
  locale:"en-US",
  type:"website"
 }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body  suppressHydrationWarning={true} className={inter.className}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        <Toaster/>
      </body>
    </html>
  );
}
