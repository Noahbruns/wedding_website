"use server";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import Image from "next/image";
import { env } from "~/env";
import MainImage from "~/images/danke_2.svg";
import IsabellaImage from "~/images/isabella.jpg";
import NoahCamImage from "~/images/noah-cam.jpg";
import LSImage from "~/images/ls.jpeg";
import FilmImage from "~/images/film.gif";
import HighlightImage from "~/images/highlight.gif";

const Content: NextPage = () => {
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
            href="https://isabellafahrner.pic-time.com/P8crrarIfkDHn"
            target="about/blank"
          >
            <div className="group relative cursor-pointer">
              <Image
                src={IsabellaImage}
                className="w-full rounded-2xl brightness-50 transition-all group-hover:brightness-90"
                alt="Bilder der Fotografin"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
                <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                  BILDER DER <br />
                  FOTOGRAFIN
                </span>
              </div>
            </div>
          </a>
          <a href="/BilderLukasSophia">
            <div className="group relative cursor-pointer">
              <Image
                src={LSImage}
                className="w-full rounded-2xl brightness-50 transition-all group-hover:brightness-90"
                alt="Bilder Lukas & Sophia"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
                <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                  PARTYBILDER
                  <br />
                  LUKAS & SOPHIA
                </span>
              </div>
            </div>
          </a>
          <a target="about/blank" href="video">
            <div className="group relative cursor-pointer">
              <Image
                src={HighlightImage}
                className="w-full rounded-2xl brightness-50 transition-all group-hover:brightness-90"
                alt="Bilder der Fotografin"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
                <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                  HIGHLIGHT VIDEO
                </span>
              </div>
            </div>
          </a>
          <a
            target="about/blank"
            href="https://u0n02v8j5oowozn9.public.blob.vercel-storage.com/videos/theCLICKwedding_Daniela%26Noah_Hochzeitsfilm-6A4RRp15SmVFJi5iioAySAfGmZS35y.mov"
          >
            <div className="group relative cursor-pointer">
              <Image
                src={FilmImage}
                className="w-full rounded-2xl brightness-50 transition-all group-hover:brightness-90"
                alt="Bilder der Fotografin"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
                <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                  HOCHZEITS FILM
                </span>
              </div>
            </div>
          </a>
          <div className="group relative cursor-pointer">
            <Image
              src={NoahCamImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                NOAHS CAMERA
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
              <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                GÄSTEBILDER
              </span>
            </div>
          </div>
          {/*<div className="group relative cursor-pointer">
            <Image
              src={IsabellaImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                STANDESAMT FILM
              </span>
            </div>
          </div>*/}
          {/*<div className="group relative cursor-pointer">
            <Image
              src={IsabellaImage}
              className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
              alt="Bilder der Fotografin"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
              <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                FOTOBOX
              </span>
            </div>
          </div>*/}
        </div>
      </div>
    </ReCaptchaProvider>
  );
};

export default Content;
