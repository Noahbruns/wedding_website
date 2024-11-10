import type { NextPage } from "next";
import Invitation from "~/images/Invitation.svg";
import Timeline from "~/images/Timeline.svg";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Main: NextPage = () => {
  return (
    <>
      <div className="snap-center sm:h-screen">
        <div className="flex max-h-full max-w-full">
          <Invitation className="" />
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
        <div className="flex max-h-full max-w-full">
          <Timeline className="mx-auto" />
        </div>
      </div>
      <div className="snap-center">
        <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
          Übernachtung
          <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
        </div>
        <div className="flex max-h-full max-w-full">
          Optionen asdfassdf asdf asd f
        </div>
      </div>
    </>
  );
};

export default Main;
