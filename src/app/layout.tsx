import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import Header from "@/components/reusable/Header";
import Provider from "@/util/Providers";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
 });

export const metadata: Metadata = {
  title: "GiriToday Marketplace",
  description: "Giri is the fastest-growing marketplace connecting Africa to the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <Provider>
        <div className="sticky top-0  z-50">
          <Header />
        </div>
        <main>
          <Suspense fallback={<LoadingOverlay/>}>
            {children}
          </Suspense>
        </main>
      </Provider>
      </body>
    </html>
  );
}
