"use client";

import { ArrowLongRightIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { env } from "~/env";
import Invitation from "~/images/Invitation.svg";
import Timeline from "~/images/Timeline.svg";
import { Anmeldung } from "./anmeldung";

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
        <div className="order-first flex flex-col gap-6 text-right text-xl leading-loose sm:order-none">
          <span className="uppercase">Liebe Familie und Freunde,</span>
          <span className="uppercase">
            willkommen auf unserer Hochzeits-Homepage! <br />
            Wir laden euch herzlich <br />
            zu unserer hochzeit
            <br />
            am <span className="underline">17. April 2025</span> ein.
            <br />
          </span>
          <span className="italic">
            Kommt hungrig, durstig und in bester Feierlaune <br />- wir haben
            Essen, Drinks und genug Bühne für all eure Tanzmoves!
          </span>
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
          Zusage / Absage
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>
        <div className="mx-auto flex max-w-xl">
          <Anmeldung />
        </div>
      </div>
      <div className="snap-center">
        <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
          Übernachtung
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>
        <div className="flex max-h-full max-w-full flex-col gap-8 px-6 py-8">
          <div className="mb-4 font-light italic">
            Wir haben euch in ein paar umliegenden Hotels und Appartments Zimmer
            vorreserviert, die ihr gerne buchen könnt. First Come, first Serve.
            Gebt bitte immer an, dass ihr im Kontingent unserer Hochzeit - unter
            "Marecek" - bucht. Die Unterkünfte halten die Zimmer bis Ende des
            Jahres frei.
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
                target="about/blank"
              >
                www.h-hotels.com
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Sachsenbucherhof in Gurten
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <span>4km entfernt</span>
              <span>1x Doppelzimmer, 2x 3-Bettzimmer und 2 Einzelzimmer</span>
              <a
                href="https://www.sachsenbucherhof.com"
                className="hover:underline"
                target="about/blank"
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
                target="about/blank"
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
              <a
                href="https://www.derkaiserhof.at"
                className="hover:underline"
                target="about/blank"
              >
                www.derkaiserhof.at
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Therme Geinberg
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <span>10km entfernt</span>
              <span>Keine Vorreservierung!</span>
              <a
                href="https://www.sparesortgeinberg.at/de"
                className="hover:underline"
                target="about/blank"
              >
                www.sparesortgeinberg.at
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Gratis Camping am Loryhof
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <span>Auf dem Parkplatz</span>
              <span>Frühstück um 15€ pro Person</span>
              <span>Sanitäranlagen nutzbar</span>
              <span>Bitte beim Loryhof selbständig voranmelden</span>
            </div>
          </div>
        </div>
      </div>
      <div className="snap-center">
        <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
          Taxi Unternehmen
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>

        <div className="flex max-h-full max-w-full flex-col gap-8 px-6 py-8">
          <div className="mb-4 font-light italic">
            Bei Bedarf könnt ihr eines dieser Unternehmen verständigen.
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Taxi Gerner-St. Martin
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <a href="tel:06804061136">Tel: 0680 40 611 36</a>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Citytaxi Altheim
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <a href="tel:0772321100">Tel: 07723 21100</a>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Taxi Tonninger Ried
            </span>
            <div className="ml-6 mt-2 flex flex-col font-light">
              <a href="tel:066488868201">Tel: 0664 88 86 8201</a>
            </div>
          </div>
        </div>
      </div>
      <div className="snap-center">
        <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
          Wünsche
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>
        <div className="mx-auto flex max-w-xl text-center">
          <div className="mb-8 mt-16 font-light italic">
            <div className="mb-4 flex w-full flex-row items-center justify-center">
              <span className="shrink-0 font-medium">
                Eure Anwesenheit ist uns tatsächlich das wertvollste Geschenk!
              </span>
              <FaceSmileIcon className="tex ml-2 h-5 w-5 shrink-0" />
            </div>
            Solltet ihr uns zusätzlich eine Freude bereiten wollen, freuen wir
            uns über einen Beitrag zur Hochzeitsreise und zum Start ins
            Abenteuer Ehe.
          </div>
        </div>
      </div>
    </ReCaptchaProvider>
  );
};

export default Main;
