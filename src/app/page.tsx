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
import FotoboxImage from "~/images/fotobox.jpg";
import HitsterImage from "~/images/hitster.png";
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
            Danke, dass ihr mit uns <br />
            gefeiert habt! <br />
          </span>
          <span className="italic">
            Viele schöne Erinnerungen sind entstanden die wir gerne mit euch
            teilen möchten! Falls ihr auch noch schöne Bilder oder Videos habt
            sendet sie uns gerne zu!
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
          <a href="/Party">
            <div className="group relative cursor-pointer">
              <Image
                src={LSImage}
                className="w-full rounded-2xl brightness-50 transition-all group-hover:brightness-90"
                alt="Bilder Lukas & Sophia"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
                <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                  PARTYBILDER
                </span>
              </div>
            </div>
          </a>
          <a href="/Fotobox">
            <div className="group relative cursor-pointer">
              <Image
                src={FotoboxImage}
                className="w-full rounded-2xl brightness-50 transition-all group-hover:brightness-90"
                alt="Bilder der Fotografin"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
                <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                  Fotobox
                </span>
              </div>
            </div>
          </a>{" "}
          <a href="/BehindTheScenes">
            <div className="group relative cursor-pointer">
              <Image
                src={NoahCamImage}
                className="rounded-2xl brightness-50 transition-all group-hover:brightness-90"
                alt="Bilder der Fotografin"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center align-middle">
                <span className="my-auto text-center text-2xl font-semibold text-white transition-all group-hover:scale-110">
                  NOAHS CAMERA <br /> BEHIND THE SCENES
                </span>
              </div>
            </div>
          </a>
          <a href="/Hitster">
            <div className="group relative cursor-pointer">
              <Image
                src={HitsterImage}
                className="w-full rounded-2xl brightness-90 transition-all group-hover:brightness-110"
                alt="Bilder der Fotografin"
              />
            </div>
          </a>
        </div>
      </div>
      <div className="group/head flex flex-row items-center text-2xl font-semibold uppercase">
        VIDEOS
        <ArrowLongRightIcon className="mb-1 ml-4 w-8 transition-all group-hover/head:ml-7" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <a target="about/blank" href="/video">
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
        <a target="about/blank" href="/film">
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
      </div>
    </ReCaptchaProvider>
  );
};

export default Content;
