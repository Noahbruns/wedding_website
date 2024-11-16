"use client";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";
import { BarLoader } from "react-spinners";
import { api } from "~/trpc/react";

type Row = {
  name: string;
  nachname: string;
  vegan: boolean;
  wunsch: string;
};

export const Anmeldung = () => {
  const { mutate, error, isSuccess, isPending } =
    api.anmeldung.anmelden.useMutation();

  const { executeRecaptcha } = useReCaptcha();

  const [guests, setGuests] = useState<Row[]>([
    { name: "", nachname: "", vegan: false, wunsch: "" },
  ]);

  const addGuest = () => {
    setGuests([
      ...guests,
      { name: "", nachname: "", vegan: false, wunsch: "" },
    ]);
  };

  const handleNameChange = (index: number, value: string) => {
    updateGuest(index, (state: Row) => ({ ...state, name: value }));
  };

  const handleNachnameChange = (index: number, value: string) => {
    updateGuest(index, (state: Row) => ({ ...state, nachname: value }));
  };

  const handleVeganChange = (index: number, value: boolean) => {
    updateGuest(index, (state: Row) => ({ ...state, vegan: value }));
  };

  const handleWunschChange = (index: number, value: string) => {
    updateGuest(index, (state: Row) => ({ ...state, wunsch: value }));
  };

  const updateGuest = (index: number, update: (state: Row) => Row) =>
    setGuests((guests) =>
      guests.map((guest, i) => (i === index ? update(guest) : guest)),
    );

  const removeGuest = (index: number) => {
    setGuests((guests) => guests.filter((_, i) => i !== index));
  };

  const SendConfetti = () => {
    const scalar = 2;
    const pineapple = confetti.shapeFromText({ text: "❤️", scalar });
    const bride = confetti.shapeFromText({ text: "👰", scalar });
    const groom = confetti.shapeFromText({ text: "🤵", scalar });

    void confetti({
      shapes: [pineapple, bride, groom],
      scalar,
      particleCount: 25,
    });

    void confetti({ particleCount: 25 });
  };

  const submitGuests = async () => {
    if (isPending || isSuccess) return;

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const chapta = await executeRecaptcha("form_submit");

    mutate({ chapta, guests });
  };

  useEffect(() => {
    if (isSuccess) {
      SendConfetti();
    }
  }, [isSuccess]);

  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      {!isSuccess && !isPending && (
        <>
          <div className="col grid grid-cols-[minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,10px)] gap-4">
            <div>Vorname</div>
            <div>Nachname</div>
            <div>Vegan</div>
            <div>Unverträglichkeiten</div>
            <div></div>
            {guests.map((guest: Row, index) => (
              <>
                <input
                  className="border border-black px-3 py-2 outline-none"
                  type="text"
                  value={guest.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                />
                <input
                  className="border border-black px-3 py-2 outline-none"
                  type="text"
                  value={guest.nachname}
                  onChange={(e) => handleNachnameChange(index, e.target.value)}
                />
                <div className="flex h-full items-center justify-center">
                  <input
                    type="checkbox"
                    checked={guest.vegan}
                    onChange={(e) => handleVeganChange(index, e.target.checked)}
                  />
                </div>
                <input
                  className="border border-black px-3 py-2 outline-none"
                  type="text"
                  value={guest.wunsch}
                  onChange={(e) => handleWunschChange(index, e.target.value)}
                />
                {index > 0 ? (
                  <button onClick={() => removeGuest(index)}>
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                ) : (
                  <div />
                )}
              </>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={addGuest}
              className="flex items-center rounded border border-white bg-white px-4 py-2 font-bold text-black hover:border-gray-400 hover:bg-gray-100"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Gast hinzufügen
            </button>
            <button
              onClick={submitGuests}
              className="rounded bg-black px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105"
            >
              Anmelden
            </button>
          </div>
        </>
      )}
      {isPending && (
        <div className="my-16 flex w-full items-center justify-center">
          <BarLoader />
        </div>
      )}
      {isSuccess && (
        <div className="my-16 flex w-full flex-col items-center justify-center">
          <span className="mb-3 text-2xl font-bold">Angemeldet!</span>

          <span className="text-xl">Wir freuen uns auf Euch!!! 🎉</span>
        </div>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
};
