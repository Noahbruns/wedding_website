"use client";

import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import HitsterImage from "~/images/hitster.png";
import INPUT_DECK from "./data.json";
import confetti from "canvas-confetti";

// --- Typen ---
export type HitsterCard = {
  id: string;
  video?: string;
  year: number;
  title: string;
  artist: string;
};

const START_CARD: HitsterCard = {
  id: "start-1990",
  year: 1990,
  title: "Startpunkt",
  artist: "Zeitlinie",
  video: undefined,
};

// --- Helper for Card Styling ---
// Generates a deterministic style based on ID so the card always looks the same
const getCardVisuals = (id: string, isStartCard: boolean) => {
  if (isStartCard) {
    return {
      bg: "bg-slate-900 border-2 border-slate-700",
      text: "text-slate-200",
      rotation: "rotate-0",
      yearColor: "text-slate-400",
    };
  }

  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const styles = [
    { bg: "bg-[#FBBF24]", text: "text-black" }, // Yellow (Linda Ronstadt style)
    { bg: "bg-[#E11D48]", text: "text-white" }, // Rose/Red (Dean Martin style)
    { bg: "bg-[#7C3AED]", text: "text-white" }, // Purple (Joe Cocker style)
    { bg: "bg-[#22D3EE]", text: "text-black" }, // Cyan (C. Tangana style)
    { bg: "bg-[#F97316]", text: "text-black" }, // Orange (Jarabe De Palo style)
  ];

  const rotations = [
    "rotate-1",
    "-rotate-2",
    "rotate-2",
    "-rotate-1",
    "rotate-0",
  ];

  const selectedStyle = styles[hash % styles.length];
  const selectedRotation = rotations[hash % rotations.length];

  return {
    bg: selectedStyle!.bg,
    text: selectedStyle!.text,
    rotation: selectedRotation,
    yearColor: "inherit",
  };
};

export default function HitsterGame() {
  // --- State ---
  const [deck, setDeck] = useState<HitsterCard[]>([]);
  const [timeline, setTimeline] = useState<HitsterCard[]>([START_CARD]);
  const [currentCard, setCurrentCard] = useState<HitsterCard | null>(null);

  // Neuer State für Selektion
  const [selectedGap, setSelectedGap] = useState<number | null>(null);

  // Feedback State
  const [gameState, setGameState] = useState<
    "welcome" | "playing" | "success" | "error" | "won"
  >("welcome");
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");

  // Initialisierung
  useEffect(() => {
    const shuffled = [...INPUT_DECK].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    if (shuffled.length > 0) {
      const first = shuffled.pop();
      setCurrentCard(first ?? null);
      setDeck([...shuffled]);
    }
  }, []);

  // --- Logik ---
  const handleGapSelect = (index: number) => {
    if (gameState !== "playing") return;
    setSelectedGap(index);
  };

  const handleConfirmPlacement = () => {
    if (selectedGap === null || !currentCard) return;

    const index = selectedGap;
    const prevCard = index > 0 ? timeline[index - 1] : null;
    const nextCard = index < timeline.length ? timeline[index] : null;

    const lowerBound = prevCard ? prevCard.year : -Infinity;
    const upperBound = nextCard ? nextCard.year : Infinity;

    const isCorrect =
      currentCard.year >= lowerBound && currentCard.year <= upperBound;

    if (isCorrect) {
      setGameState("success");
      setFeedbackMsg(`Richtig! Das Jahr ist ${currentCard.year}.`);

      // Karte direkt in Timeline einfügen (visuell)
      const newTimeline = [...timeline];
      newTimeline.splice(index, 0, currentCard);
      setTimeline(newTimeline);
    } else {
      setGameState("error");
      setFeedbackMsg(`Falsch! Das Jahr war ${currentCard.year}.`);
    }
  };

  const handleContinue = () => {
    // Wenn 'error', Karte zurück in Stapel
    if (gameState === "error" && currentCard) {
      setDeck((prev) => [currentCard, ...prev]);
    }

    if (deck.length === 0 && gameState !== "error") {
      setGameState("won");
      setCurrentCard(null);
      setSelectedGap(null);
      void confetti();
    } else {
      const nextDeck = [...deck];
      const next = nextDeck.pop();
      setDeck(nextDeck);

      setCurrentCard(next ?? null);
      setGameState("playing");
      setSelectedGap(null);
      setFeedbackMsg("");
    }
  };

  return (
    <main className="--font-montserrat -z-40 flex h-screen w-screen flex-col overflow-auto bg-black text-slate-100">
      {/* --- HEADER --- */}
      <Image
        src={HitsterImage}
        alt="HITSTER Logo"
        className="fixed left-0 right-0 -z-20 w-56 opacity-50"
      />

      {/* --- OBERER BEREICH: VIDEO & STEUERUNG --- */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6">
          {/* Welcome State */}
          {gameState === "welcome" && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-yellow-400">Willkommen</h2>
              <button
                onClick={() => setGameState("playing")}
                className="mt-6 rounded bg-white px-6 py-2 font-bold text-black hover:bg-gray-200"
              >
                Start
              </button>
            </div>
          )}

          {/* Won State */}
          {gameState === "won" && (
            <div className="text-center">
              <div className="mb-4 text-6xl">🏆</div>
              <h2 className="text-3xl font-bold text-yellow-400">Gewonnen</h2>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded bg-white px-6 py-2 font-bold text-black hover:bg-gray-200"
              >
                Neustart
              </button>
            </div>
          )}

          {/* Aktuelle Karte (Video) */}
          {currentCard && gameState !== "won" && gameState !== "welcome" && (
            <div className="flex h-full w-full flex-col border border-slate-700 bg-slate-800 p-2 shadow-2xl">
              <div className="relative aspect-video overflow-hidden bg-black">
                {currentCard.video ? (
                  <video
                    src={currentCard.video}
                    controls
                    className="h-full w-full object-cover"
                    autoPlay={true}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500">
                    Kein Video verfügbar
                  </div>
                )}
              </div>

              {/* Info Bereich (Versteckt wenn playing) */}
              <div className="p-4 text-center">
                {gameState === "playing" ? (
                  <div className="my-auto animate-pulse text-slate-300">
                    Höre genau hin... wo passt der Song? {currentCard.year}
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <h3 className="text-xl font-bold">{currentCard.title}</h3>
                    <p className="text-slate-400">{currentCard.artist}</p>
                    <p className="mt-1 text-2xl font-bold text-orange-400">
                      {currentCard.year}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Feedback Box */}
          {gameState !== "playing" &&
            gameState !== "won" &&
            gameState !== "welcome" && (
              <div
                className={`animate-in fade-in zoom-in absolute bottom-20 z-50 w-full max-w-md rounded-xl border p-6 text-center shadow-2xl duration-300 ${
                  gameState === "success"
                    ? "border-green-500 bg-green-900 text-white"
                    : "border-red-500 bg-red-900 text-white"
                } `}
              >
                <h2 className="mb-1 text-2xl font-bold">
                  {gameState === "success" ? "Richtig! 🎉" : "Leider nein ❌"}
                </h2>
                <p className="mb-4 text-lg">{feedbackMsg}</p>
                <button
                  onClick={handleContinue}
                  className="rounded-full bg-white px-8 py-2 font-bold text-slate-900 shadow-lg transition-transform hover:scale-105"
                >
                  Weiter
                </button>
              </div>
            )}

          {/* Action Button */}
          {gameState === "playing" && currentCard && (
            <button
              onClick={handleConfirmPlacement}
              disabled={selectedGap === null}
              className={`rounded-full px-10 py-4 text-lg font-bold shadow-xl transition-all duration-300 ${
                selectedGap !== null
                  ? "transform bg-orange-500 text-white hover:scale-105 hover:bg-orange-600"
                  : "cursor-not-allowed bg-slate-700 text-slate-500"
              } `}
            >
              {selectedGap === null ? "Position wählen" : "Platzieren"}
            </button>
          )}
        </div>
      </div>

      {/* --- UNTERER BEREICH: ZEITLINIE --- */}
      <div className="z-10 flex flex-col border-t border-slate-700 bg-slate-900/50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="flex flex-1 items-center overflow-x-auto overflow-y-hidden p-8 pb-12">
          <div className="mx-auto flex min-w-max items-center">
            {timeline.map((card, index) => (
              <React.Fragment key={card.id}>
                {/* Lücken-Selektor */}
                <GapSelector
                  index={index}
                  isSelected={selectedGap === index}
                  onClick={() => handleGapSelect(index)}
                  disabled={gameState !== "playing"}
                />

                {/* Platzierte Karte */}
                <TimelineCard
                  card={card}
                  isNew={gameState === "success" && card.id === currentCard?.id}
                />
              </React.Fragment>
            ))}

            {/* Letzter Selektor */}
            <GapSelector
              index={timeline.length}
              isSelected={selectedGap === timeline.length}
              onClick={() => handleGapSelect(timeline.length)}
              disabled={gameState !== "playing"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// --- COMPONENTS ---

function TimelineCard({ card, isNew }: { card: HitsterCard; isNew?: boolean }) {
  const isStartCard = card.artist === "Zeitlinie";

  // Use memo to ensure styles don't change on re-renders
  const visuals = useMemo(
    () => getCardVisuals(card.id, isStartCard),
    [card.id, isStartCard],
  );

  return (
    <div
      className={`relative mx-2 flex h-40 w-40 flex-col items-center justify-between p-3 shadow-xl transition-transform ${visuals.bg} ${visuals.text} ${visuals.rotation} ${isNew ? "animate-in zoom-in spin-in-3 duration-700" : ""} `}
    >
      {/* Top: Artist */}
      <div className="w-full text-center">
        <p className="line-clamp-1 text-[10px] font-bold uppercase tracking-wider opacity-90">
          {card.artist}
        </p>
      </div>

      {/* Center: Year */}
      <div
        className={`text-5xl font-black tracking-tighter ${visuals.yearColor}`}
      >
        {card.year}
      </div>

      {/* Bottom: Song Title */}
      <div className="w-full text-center">
        <p className="line-clamp-2 text-xs italic leading-tight">
          {card.title}
        </p>
      </div>

      {/* Optional: Subtle paper texture overlay or highlight could go here */}
    </div>
  );
}

function GapSelector({
  index,
  isSelected,
  onClick,
  disabled,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div className="relative flex h-40 flex-col items-center justify-center px-1">
      {/* Invisible hit area for easier clicking */}
      <button
        onClick={onClick}
        disabled={disabled}
        className={`group z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${
          disabled ? "cursor-default opacity-0" : "cursor-pointer"
        } ${isSelected ? "scale-110 opacity-100" : "opacity-50 hover:opacity-100"}`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg transition-all ${
            isSelected
              ? "border-orange-500 bg-orange-500 text-white"
              : "border-orange-500 bg-orange-800 text-orange-400 group-hover:border-orange-400 group-hover:text-orange-400"
          }`}
        >
          {isSelected ? (
            <span className="text-lg font-bold">✓</span>
          ) : (
            <span className="text-xl font-bold">+</span>
          )}
        </div>
      </button>

      {/* Visual Guide Line (only visible when hovering or selected to keep UI clean) */}
      {!disabled && (
        <div
          className={`absolute top-1/2 -z-10 h-0.5 w-8 bg-slate-700 transition-opacity ${isSelected || "group-hover:opacity-100"} opacity-0`}
        ></div>
      )}
    </div>
  );
}
