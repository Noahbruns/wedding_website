import "~/styles/globals.css";

import { Raleway } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const RalewayLatin = Raleway({
  subsets: ["latin"],
  display: "block",
});

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Wedding Website",
  description: "Wedding Website for Noah und Dani",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${RalewayLatin.className}`}>
      <body className="bg-background font-raleway container mx-auto my-5 mt-0 flex w-full snap-y flex-col gap-16 px-4 pt-0 text-black">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
