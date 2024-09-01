import { HydrateClient } from "~/trpc/server";
import Text from "~/images/TEXT.svg";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="bg-main min-h-screen w-screen snap-y snap-mandatory overflow-y-auto bg-white text-black">
        <div className="flex w-screen flex-col bg-[url('/main.jpg')] bg-cover bg-top text-white">
          <div className="flex h-screen w-screen snap-center flex-col items-center justify-center p-10">
            <Text className="h-full w-full" />
          </div>
          <div className="h-24 bg-gradient-to-t from-black/45 md:h-72"></div>
          <div className="h-screen snap-center bg-black/45">
            <div className="container mx-auto grid h-full grid-cols-1 gap-2 p-4 text-lg uppercase md:grid-cols-2 md:gap-3 md:text-2xl">
              <div className="flex flex-col gap-16">
                <div>ANREISE</div>
                <div>ÜBERNACHTUNG</div>
                <div>MENU</div>
                <div>BILDER</div>
              </div>
              <div className="text-right">asdfasdfasdf</div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
