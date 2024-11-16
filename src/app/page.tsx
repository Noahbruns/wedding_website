"use client";

import type { NextPage } from "next";
import Invitation from "~/images/Invitation.svg";
import Timeline from "~/images/Timeline.svg";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Anmeldung } from "./_components/anmeldung";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { env } from "~/env";

const Main: NextPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <div className="snap-center sm:h-screen">
        <div className="flex h-full">
          <div className="w-full">
            <Invitation />
          </div>
        </div>
      </div>
      <div className="flex snap-center flex-col gap-32 pb-16">
        <div className="order-first text-right text-xl uppercase leading-loose sm:order-none">
          Wir laden euch <br />
          herzlich zu unserer hochzeit
          <br />
          am 17. April 2025 ein
        </div>
      </div>
      <div className="snap-center">
        <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
          Ablauf
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>
        <div className="mx-auto flex max-w-xl">
          <Timeline className="mx-auto" />
        </div>
      </div>
      <div className="snap-center">
        <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
          Anmeldung
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>
        <div className="mx-auto flex max-w-xl">
          <Anmeldung />
        </div>
      </div>
      <div className="snap-center">
        {" "}
        z
        <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
          Übernachtung
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>
        <div className="flex max-h-full max-w-full flex-col gap-8 px-6 py-8">
          <div className="mb-4 font-light italic">
            Wir haben euch schon bei ein paar Hotels Zimmer vorreserviert die
            ihr gerne buchen könnt. First Come First Serve. Gebt bitte immer an,
            dass ihr im Kontingent unserer Hochzeit bucht. Die Hotels halten die
            Plätze bis zum ?. November frei.
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Seebuchnerhof in Gurten
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <span>4km entfernt</span>
              <span>1x Doppelzimmer, 2x 3-Bettzimmer und 2 Einzelzimmer</span>
              <a
                href="https://www.sachsenbucherhof.com"
                className="hover:underline"
              >
                www.sachsenbucherhof.com
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Pension Wagner in Kirchheim
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <span>5km entfernt</span>
              <span>1x Doppelzimmer, 2x 3-Bettzimmer und 2 Einzelzimmer</span>
              <a
                href="https://www.pension-wenger.at"
                className="hover:underline"
              >
                www.pension-wenger.at
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Hotel Kaiserhof in Ried im Innkreis
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <span>10km entfernt</span>
              <span>2x Junior Suite und 4x Classic Doppelzimmer</span>
              <a href="https://www.derkaiserhof.at" className="hover:underline">
                www.derkaiserhof.at
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              H+ Hotel Ried
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <span>10km entfernt</span>
              <span>20 Zimmer vorreserviert</span>
              <a
                href="https://www.h-hotels.com/de/hplus/hotels/hplus-hotel-ried"
                className="hover:underline"
              >
                www.h-hotels.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </ReCaptchaProvider>
  );
};

export default Main;
