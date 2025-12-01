import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matify Ai",
  description: "Math solving,reimagined on canvas.",
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
