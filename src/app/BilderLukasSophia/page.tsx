import { NextPage } from "next";
import ImageViewer from "../ImageViewer";
import { list } from "@vercel/blob";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Content: NextPage = async () => {
  const images = await list({
    prefix: "Lukas_Sophia_BFFFE8CD-7F0E-43C7-9556-7E1872812501/preview/",
  });

  return (
    <>
      <a href="/" className="mb-0 mt-10 flex items-center gap-4">
        <ArrowLeftCircleIcon className="size-7" />
        Zurück
      </a>
      <div className="-mb-5 text-3xl font-semibold uppercase">
        Bilder von Lukas und Sophia
      </div>
      <ImageViewer initialBlobs={images.blobs} />
    </>
  );
};

export default Content;
