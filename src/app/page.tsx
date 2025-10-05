"use server";

import { cookies } from "next/headers";
import Content from "./content";
import PasswordScreen from "./pw";
import { type NextPage } from "next";

const PW = "BRUNS46";

const Main: NextPage = async () => {
  const cookieStore = cookies();
  const pw_cookie = cookieStore.get("pw")?.value;

  if (pw_cookie == PW) {
    return <Content />;
  } else return <PasswordScreen />;
};

export default Main;
