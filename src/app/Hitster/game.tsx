"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
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
  id: "start-1980",
  year: 1980,
  title: "Startpunkt",
  artist: "Zeitlinie",
  video: undefined,
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
    "playing" | "success" | "error" | "won"
  >("playing");
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

    // Wenn 'success', ist Karte schon in Timeline, wir brauchen sie nicht mehr im Deck

    // Prüfen ob Spiel vorbei
    if (deck.length === 0 && gameState !== "error") {
      setGameState("won");
      setCurrentCard(null);
      setSelectedGap(null);

      void confetti();
    } else {
      // Nächste Karte ziehen
      const nextDeck = [...deck];
      const next = nextDeck.pop();
      setDeck(nextDeck);
      setCurrentCard(next ?? null);

      // Reset States
      setGameState("playing");
      setSelectedGap(null);
      setFeedbackMsg("");
    }
  };

  return (
    <main className="-z-40 flex h-screen w-screen flex-col overflow-auto bg-black text-slate-100">
      {/* --- HEADER --- */}
      <Image
        src={HitsterImage}
        alt="HITSTER Logo"
        className="fixed left-0 right-0 -z-20 w-56"
      />

      {/* --- OBERER BEREICH: VIDEO & STEUERUNG --- */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6">
          {/* Gewonnen State */}
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
          {currentCard && gameState !== "won" && (
            <div className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-2 shadow-2xl">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                {currentCard.video ? (
                  <video
                    src={currentCard.video}
                    controls
                    className="h-full w-full object-cover"
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
                  <div className="flex animate-pulse flex-col items-center gap-2">
                    <div className="h-4 w-1/3 rounded bg-slate-700"></div>
                    <div className="h-3 w-1/4 rounded bg-slate-700"></div>
                    <p className="mt-2 text-sm text-slate-500">
                      Wähle unten eine Lücke und klicke Fertig
                    </p>
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

          {/* Status / Feedback Box */}
          {gameState !== "playing" && gameState !== "won" && (
            <div
              className={`animate-in fade-in zoom-in w-full rounded-xl border p-4 text-center shadow-lg duration-300 ${gameState === "success" ? "border-green-500 bg-green-900/50 text-green-100" : "border-red-500 bg-red-900/50 text-red-100"} `}
            >
              <h2 className="mb-1 text-2xl font-bold">
                {gameState === "success" ? "Fantastisch! 🎉" : "Oh nein! ❌"}
              </h2>
              <p className="mb-4 text-lg">{feedbackMsg}</p>
              <button
                onClick={handleContinue}
                className="rounded-full bg-white px-8 py-2 font-bold text-slate-900 transition-transform hover:scale-105"
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
              {selectedGap === null ? "Bitte Position wählen" : "Fertig"}
            </button>
          )}
        </div>
      </div>

      {/* --- UNTERER BEREICH: ZEITLINIE --- */}
      <div className="z-10 flex flex-col border-t border-slate-700 bg-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="sticky left-0 flex items-center justify-between border-b border-slate-700 bg-slate-800/90 px-6 py-2 backdrop-blur">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Deine Zeitlinie
          </span>
          <span className="text-xs text-slate-500">
            Stapel: {deck.length} Karten übrig
          </span>
        </div>

        <div className="flex flex-1 items-center overflow-x-auto p-6">
          <div className="mx-auto flex min-w-max items-center space-x-2">
            {timeline.map((card, index) => (
              <React.Fragment key={card.id}>
                {/* Lücken-Selektor VOR der Karte */}
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

            {/* Lücken-Selektor NACH der letzten Karte */}
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

// --- Komponenten ---
function TimelineCard({ card, isNew }: { card: HitsterCard; isNew?: boolean }) {
  const isStartCard = card.year === 1980 && card.artist === "Zeitlinie";

  return (
    <div
      className={`group relative flex flex-col items-center ${isNew ? "animate-in zoom-in duration-500" : ""}`}
    >
      {/* Jahreszahl Bubble */}
      <div
        className={`z-10 mb-2 rounded-full border-2 px-3 py-1 text-xl font-bold ${
          isStartCard
            ? "border-slate-600 bg-slate-700 text-slate-400"
            : "border-orange-400 bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]"
        } `}
      >
        {card.year}
      </div>

      {/* Karte */}
      <div className="relative flex h-40 w-32 flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
        <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-2 text-center">
          <div>
            <p className="line-clamp-2 text-xs font-bold text-white">
              {card.title}
            </p>
            <p className="mt-1 line-clamp-1 text-[10px] text-slate-400">
              {card.artist}
            </p>
          </div>
        </div>
        {/* Dekorativer unterer Balken */}
        <div
          className={`h-1 w-full ${isStartCard ? "bg-slate-600" : "bg-orange-500"}`}
        ></div>
      </div>

      {/* Vertikale Linie */}
      <div className="mt-2 h-6 w-px bg-slate-700"></div>
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
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex h-32 w-12 flex-col items-center justify-center rounded-lg transition-all duration-200 ${disabled ? "cursor-default" : "cursor-pointer hover:bg-slate-800"} `}
    >
      {/* Linie horizontal (Zeitleiste) */}
      <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full bg-slate-700"></div>

      {/* Der Button Kreis */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 ${
          isSelected
            ? "scale-125 border-orange-400 bg-orange-500 text-white shadow-orange-500/50"
            : "border-slate-600 bg-slate-800 text-slate-500"
        } ${!disabled && !isSelected && "group-hover:scale-110 group-hover:border-orange-500 group-hover:text-orange-500"} `}
      >
        {isSelected ? (
          <span className="text-lg font-bold">✓</span>
        ) : (
          <span className="text-xl">+</span>
        )}
      </div>

      {isSelected && (
        <div className="absolute -top-8 animate-bounce whitespace-nowrap text-xs font-bold text-orange-400">
          Hier?
        </div>
      )}
    </button>
  );
}
