import { NextPage } from "next";
import ImageViewer from "../ImageViewer";
import { list } from "@vercel/blob";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Content: NextPage = async () => {
  const imagesLS = await list({
    prefix: "Lukas_Sophia_BFFFE8CD-7F0E-43C7-9556-7E1872812501/preview/",
  });
  const imagesFlo = await list({
    prefix: "Flo_6CA6F003-3423-417B-AD88-6F5E6C1714BA/",
  });
  const imagesNC = await list({
    prefix: "Noahs_Cam_D519AA54-530A-4473-8664-C7B53ACBA573/preview/",
  });

  return (
    <>
      <a href="/" className="mb-0 mt-10 flex items-center gap-4">
        <ArrowLeftCircleIcon className="size-7" />
        Zurück
      </a>
      <div className="-mb-5 text-3xl font-semibold uppercase">
        Partybilder von Lukas und Sophia
      </div>
      <ImageViewer initialBlobs={imagesLS.blobs} />
      <div className="-mb-5 text-3xl font-semibold uppercase">
        Videos Flo Markus
      </div>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
        {imagesFlo.blobs
          .filter((blob) => blob.pathname.endsWith(".mov"))
          .map((blob, index) => (
            <div>
              <video
                key={blob.pathname}
                controls
                className="aspect-square object-cover"
              >
                <source src={blob.downloadUrl} />
              </video>
            </div>
          ))}
      </div>
      <div className="-mb-5 text-3xl font-semibold uppercase">
        Partybilder von Noahs Camera
      </div>
      <ImageViewer initialBlobs={imagesNC.blobs} />
    </>
  );
};

export default Content;
