//"use server";

import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Raleway } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const RalewayLatin = Raleway({
  subsets: ["latin"],
  display: "block",
});

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import { cookies } from "next/headers";
import PasswordScreen from "./pw";

const PW = "TOBLERONE17";

export const metadata: Metadata = {
  title: "Wedding Website",
  description: "Wedding Website for Noah und Dani",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const pw_cookie = cookieStore.get("pw")?.value;

  if (pw_cookie != PW) {
    return (
      <html lang="en" className={`${RalewayLatin.className}`}>
        <body className="font-raleway container mx-auto my-5 mt-0 flex w-full snap-y flex-col gap-16 bg-background px-4 pb-16 pt-0 text-black">
          <PasswordScreen />
          <Analytics />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${RalewayLatin.className}`}>
      <body className="font-raleway container mx-auto my-5 mt-0 flex w-full snap-y flex-col gap-16 bg-background px-4 pb-16 pt-0 text-black">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
