import type { NextPage } from "next";
import Invitation from "~/images/Invitation.svg";
import Timeline from "~/images/Timeline.svg";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Main: NextPage = () => {
  return (
    <>
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
          Übernachtung
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>
        <div className="flex max-h-full max-w-full flex-col px-6 py-8">
          <div className="mb-8 font-light italic">
            Wir haben euch schon bei ein paar Hotels Zimmer vorreserviert die
            ihr gerne buchen könnt. First Come First Serve.
          </div>
          <div className="flex flex-col">
            <span className="shrink-0 font-medium uppercase">
              Seebuchnerhof in Gurten
            </span>
            <div className="ml-4 font-light">
              4km entfernt <br /> 1x Doppelzimmer und 2x 3-Bett Zimmer
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
