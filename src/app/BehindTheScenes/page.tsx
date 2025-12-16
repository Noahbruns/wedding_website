import { NextPage } from "next";
import ImageViewer from "../ImageViewer";
import { list } from "@vercel/blob";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Content: NextPage = async () => {
  const images = await list({
    prefix: "Noah_BHS_88351F31-6273-4530-9F7C-52D51FF1893C/preview/",
  });

  return (
    <>
      <a href="/" className="mb-0 mt-10 flex items-center gap-4">
        <ArrowLeftCircleIcon className="size-7" />
        Zurück
      </a>
      <div className="-mb-5 text-3xl font-semibold uppercase">
        Bilder von Noahs Camera
      </div>
      <ImageViewer initialBlobs={images.blobs} />
    </>
  );
};

export default Content;
