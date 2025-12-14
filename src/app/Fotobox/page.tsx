import { NextPage } from "next";
import ImageViewer from "../ImageViewer";
import { list } from "@vercel/blob";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Content: NextPage = async () => {
  const images = await list({
    prefix: "Fotobox_86DA43B1-6020-4073-9751-97907B4216E6/preview/",
  });

  return (
    <>
      <a href="/" className="mb-0 mt-10 flex items-center gap-4">
        <ArrowLeftCircleIcon className="size-7" />
        Zurück
      </a>
      <div className="-mb-5 text-3xl font-semibold uppercase">Fotobox</div>
      <ImageViewer initialBlobs={images.blobs} />
    </>
  );
};

export default Content;
