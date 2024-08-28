import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-wide sm:text-[5rem]">
            Freddy is READY! 🎉
          </h1>
        </div>
      </main>
    </HydrateClient>
  );
}
