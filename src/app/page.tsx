"use server";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import Image from "next/image";
import { env } from "~/env";
import MainImage from "~/images/danke_2.svg";
import IsabellaImage from "~/images/isabella.jpg";
import FilmImage from "~/images/film.gif";
import HighlightImage from "~/images/highlight.png";

const Main: NextPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <div className="snap-center sm:h-screen">
        <div className="flex h-full">
          <div className="w-full">
            <MainImage />
          </div>
        </div>
      </div>
      <div className="ml-auto max-w-xl snap-center flex-col gap-32 pb-16">
        <div className="order-first flex flex-col gap-6 text-right text-xl leading-loose sm:order-none">
          <span className="uppercase">Liebe Familie und Freunde,</span>
          <span className="uppercase">
            willkommen auf unserer Homepage! <br />
            Wir laden euch herzlich <br />
            zu unserer Hochzeit
            <br />
            am <span className="underline">17. April 2025</span> ein.
            <br />
          </span>
          <span className="italic">
            Kommt in bester Feierlaune <wbr />- wir haben Essen, Drinks und
            genug Bühne für all eure Tanzmoves!
          </span>
        </div>
      </div>
      <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
        BILDER
        <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
      </div>
      <div className="my-4 flex flex-col items-center">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <a
            className="group relative cursor-pointer"
            href="https://isabellafahrner.pic-time.com/P8crrarIfkDHn"
            target="about/blank"
          >
            <Image
              src={IsabellaImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-2xl font-semibold text-white transition-all group-hover:scale-110">
                FOTOGRAFIN
              </span>
            </div>
          </a>
          <div className="group relative cursor-pointer">
            <Image
              src={IsabellaImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-2xl font-semibold text-white transition-all group-hover:scale-110">
                FOTOBOX
              </span>
            </div>
          </div>
          <div className="group relative cursor-pointer">
            <Image
              src={HighlightImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-2xl font-semibold text-white transition-all group-hover:scale-110">
                HIGHLIGHT VIDEO
              </span>
            </div>
          </div>
          <div className="group relative cursor-pointer">
            <Image
              src={FilmImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-2xl font-semibold text-white transition-all group-hover:scale-110">
                HOCHZEITS FILM
              </span>
            </div>
          </div>
          <div className="group relative cursor-pointer">
            <Image
              src={IsabellaImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-2xl font-semibold text-white transition-all group-hover:scale-110">
                GÄSTEBILDER
              </span>
            </div>
          </div>
          <div className="group relative cursor-pointer">
            <Image
              src={IsabellaImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-2xl font-semibold text-white transition-all group-hover:scale-110">
                STANDESAMT FILM
              </span>
            </div>
          </div>
        </div>
      </div>
    </ReCaptchaProvider>
  );
};

export default Main;
