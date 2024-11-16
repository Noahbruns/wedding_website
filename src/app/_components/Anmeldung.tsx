"use client";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";
import { BarLoader } from "react-spinners";
import { api } from "~/trpc/react";
import Checkbox from "react-simple-checkbox";

type Row = {
  name: string;
  nachname: string;
  vegan: boolean;
  hochstuhl: boolean;
  wunsch: string;
};

export const Anmeldung = () => {
  const { mutate, error, isSuccess, isPending } =
    api.anmeldung.anmelden.useMutation();

  const { executeRecaptcha } = useReCaptcha();

  const [guests, setGuests] = useState<Row[]>([
    { name: "", nachname: "", vegan: false, hochstuhl: false, wunsch: "" },
  ]);

  const addGuest = () => {
    setGuests([
      ...guests,
      { name: "", nachname: "", vegan: false, hochstuhl: false, wunsch: "" },
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

  const handleHochstuhlChange = (index: number, value: boolean) => {
    updateGuest(index, (state: Row) => ({ ...state, hochstuhl: value }));
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
          {guests.map((guest: Row, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-4 bg-white p-4"
            >
              <div className="flex w-full flex-row gap-4">
                <div className="flex w-full flex-col gap-2">
                  <label htmlFor={`name-${index}`}>Vorname</label>
                  <input
                    id={`name-${index}`}
                    className="w-full border border-black px-3 py-2 outline-none"
                    type="text"
                    value={guest.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label htmlFor={`nachname-${index}`}>Nachname</label>
                  <input
                    id={`nachname-${index}`}
                    className="w-full border border-black px-3 py-2 outline-none"
                    type="text"
                    value={guest.nachname}
                    onChange={(e) =>
                      handleNachnameChange(index, e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor={`vegan-${index}`}>Vegan</label>
                  <Checkbox
                    id={`vegan-${index}`}
                    type="checkbox"
                    className="mx-auto"
                    tickAnimationDuration={150}
                    backAnimationDuration={80}
                    size={2}
                    color="#000"
                    checked={guest.vegan}
                    onChange={(isChecked: boolean) =>
                      handleVeganChange(index, isChecked)
                    }
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor={`vegan-${index}`}>Hochstuhl</label>
                  <Checkbox
                    id={`vegan-${index}`}
                    type="checkbox"
                    className="mx-auto"
                    tickAnimationDuration={150}
                    backAnimationDuration={80}
                    size={2}
                    color="#000"
                    checked={guest.hochstuhl}
                    onChange={(isChecked: boolean) =>
                      handleHochstuhlChange(index, isChecked)
                    }
                  />
                </div>
                <div className="flex w-full basis-full flex-col gap-2 md:basis-auto">
                  <label htmlFor={`wunsch-${index}`}>
                    Unverträglichkeiten (optional)
                  </label>
                  <input
                    id={`wunsch-${index}`}
                    className="border border-black px-3 py-2 outline-none"
                    type="text"
                    value={guest.wunsch}
                    onChange={(e) => handleWunschChange(index, e.target.value)}
                  />
                </div>
              </div>

              {index > 0 && (
                <button
                  className="flex w-full flex-row items-center justify-center bg-gray-100"
                  onClick={() => removeGuest(index)}
                >
                  <XMarkIcon className="mr-2 h-5 w-5" /> remove
                </button>
              )}
            </div>
          ))}

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={addGuest}
              className="flex items-center border border-white bg-white px-4 py-2 font-bold text-black hover:border-gray-400 hover:bg-gray-100"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Gast hinzufügen
            </button>
            <button
              onClick={submitGuests}
              className="bg-black px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105"
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
