"use client";

import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import HitsterImage from "~/images/hitster.png";
import INPUT_DECK from "./data.json";
import confetti from "canvas-confetti";
import { api } from "~/trpc/react";

// --- Typen ---
export type HitsterCard = {
  id: string;
  video?: string;
  year: number;
  title: string;
  artist: string;
};

export type Player = {
  id: number;
  name: string;
  score: number;
};

const START_CARD: HitsterCard = {
  id: "start-1990",
  year: 1990,
  title: "Startpunkt",
  artist: "Zeitlinie",
  video: undefined,
};

// Standard-Solo-Spieler
const SOLO_PLAYER: Player = {
  id: 1,
  name: "Solo",
  score: 0,
};

// --- Helper for Card Styling ---
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
    { bg: "bg-[#FBBF24]", text: "text-black" }, // Yellow
    { bg: "bg-[#E11D48]", text: "text-white" }, // Rose/Red
    { bg: "bg-[#7C3AED]", text: "text-white" }, // Purple
    { bg: "bg-[#22D3EE]", text: "text-black" }, // Cyan
    { bg: "bg-[#F97316]", text: "text-black" }, // Orange
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

  const [selectedGap, setSelectedGap] = useState<number | null>(null);

  // Spieler- und Punkte-States (nur ein Spieler im Solo-Modus)
  const [player, setPlayer] = useState<Player>(SOLO_PLAYER);

  // Modal State
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Feedback State
  const [gameState, setGameState] = useState<
    "welcome" | "playing" | "success" | "error" | "won"
  >("welcome");
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");

  // Initialisierung (Spiel startet sofort im 'playing' Zustand)
  useEffect(() => {
    // Initialisiere Deck und ziehe erste Karte
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
      setFeedbackMsg(
        `Richtig! Das Jahr ist ${currentCard.year}. Du erhältst 1 Punkt.`,
      );

      // Punkt vergeben
      setPlayer((prev) => ({ ...prev, score: prev.score + 1 }));

      // Karte direkt in Timeline einfügen (visuell)
      const newTimeline = [...timeline];
      newTimeline.splice(index, 0, currentCard);
      setTimeline(newTimeline);
    } else {
      setGameState("error");
      setFeedbackMsg(`Falsch! Das Jahr war ${currentCard.year}. Kein Punkt.`);
      // Falsch platzierte Karte wird aus dem Spiel genommen.
    }
  };

  const handleContinue = () => {
    // Prüfen, ob noch Karten im Deck sind
    if (deck.length === 0) {
      setGameState("won");
      setCurrentCard(null);
      setSelectedGap(null);
      void confetti();
      return;
    }

    const nextDeck = [...deck];
    const next = nextDeck.pop();
    setDeck(nextDeck);

    setCurrentCard(next ?? null);
    setGameState("playing");
    setSelectedGap(null);
    setFeedbackMsg("");
  };

  return (
    <main className="--font-montserrat -z-40 flex h-screen w-screen flex-col overflow-auto bg-black text-slate-100">
      {/* --- HEADER --- */}
      <Image
        src={HitsterImage}
        alt="HITSTER Logo"
        className="fixed left-0 right-0 -z-20 w-56 opacity-50"
      />

      {/* --- OBERER BEREICH: Welcome --- */}
      {gameState === "welcome" && (
        <div className="mt-10 flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-bold text-yellow-400">Willkommen</h2>
          <div className="text-lg text-yellow-400">
            Ihr habt uns herausgefordert, jetzt fordern wir euch heraus!
          </div>

          <button
            onClick={() => setGameState("playing")}
            className="mx-auto rounded bg-white px-6 py-2 font-bold text-black hover:bg-gray-200"
          >
            Los gehts!
          </button>
        </div>
      )}

      {/* --- OBERER BEREICH: VIDEO & STEUERUNG --- */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6">
          {/* Won State / Scoreboard (Direktes Anzeigen des Formulars) */}
          {gameState === "won" && <Scoreboard score={player.score} />}

          {/* Aktuelle Karte (Video) */}
          {currentCard && gameState !== "won" && gameState !== "welcome" && (
            <div className="flex w-full flex-col border border-slate-700 bg-slate-800 p-2 shadow-2xl">
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
                  <div className="my-auto text-slate-300">
                    Höre genau hin... wo passt der Song?
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
                  {deck.length === 0 ? "Zur Rangliste" : "Weiter"}
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
        {/* Leaderboard Button */}
        <div className="relative flex w-full justify-end px-8 pt-4">
          {gameState !== "won" && (
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-sm font-bold text-slate-200 shadow-md transition-colors hover:bg-slate-600"
            >
              <span className="text-xl">🏆</span> Rangliste
            </button>
          )}
        </div>

        <div className="flex flex-1 items-center overflow-x-auto overflow-y-hidden p-8 pb-12 pt-4">
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

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
      )}
    </main>
  );
}

// --- COMPONENTS ---

function TimelineCard({ card, isNew }: { card: HitsterCard; isNew?: boolean }) {
  const isStartCard = card.artist === "Zeitlinie";

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
// 1. Leaderboard Modal Component (mit tRPC Query)
function LeaderboardModal({ onClose }: { onClose: () => void }) {
  // --- tRPC Integration ---
  const {
    data: leaderboard = [],
    isLoading,
    refetch,
  } = api.leaderboard.getTopScores.useQuery({ limit: 10 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="animate-in zoom-in w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-8 text-center shadow-2xl duration-300">
        <h2 className="mb-6 text-3xl font-bold text-yellow-400">
          🏆 Top Rangliste
        </h2>

        {isLoading && <p className="text-slate-400">Lade Rangliste...</p>}

        {!isLoading && (
          <div className="space-y-3">
            {leaderboard.length === 0 && (
              <p className="text-slate-400">Noch keine Einträge vorhanden.</p>
            )}
            {leaderboard.map((player, index) => (
              <div
                key={player.id}
                className={`flex justify-between rounded-lg p-3 font-bold transition-all ${
                  index === 0
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                <span className="text-xl">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `${index + 1}.`}{" "}
                  {player.name}
                </span>
                <span className="text-xl">{player.score}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-8 rounded-full bg-white px-8 py-2 font-bold text-black shadow-lg transition-transform hover:scale-105"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

// 2. Scoreboard / Lead List Component (mit tRPC Mutation)
function Scoreboard({ score }: { score: number }) {
  const [playerName, setPlayerName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // --- tRPC Integration ---
  const addScoreMutation = api.leaderboard.addScore.useMutation({
    onSuccess: () => {
      setSubmitMessage("Erfolg! Dein Ergebnis wurde gespeichert.");
      setIsSubmitted(true);
    },
    onError: (error) => {
      setSubmitMessage(`Fehler beim Speichern: ${error.message}`);
      setIsSubmitted(false);
    },
  });

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || score === 0 || addScoreMutation.isPending) return;

    setSubmitMessage("Wird gespeichert...");
    addScoreMutation.mutate({ name: playerName, score: score });
  };

  return (
    <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-800 p-8 text-center shadow-2xl">
      <div className="mb-4 text-6xl">🎉</div>
      <h2 className="text-3xl font-bold text-yellow-400">Spiel beendet!</h2>
      <p className="mb-6 text-xl text-slate-300">
        Dein Endergebnis:{" "}
        <span className="font-extrabold text-orange-400">{score} Punkte</span>
      </p>

      {/* Highscore Formular (Wird direkt angezeigt) */}
      {isSubmitted ? (
        <p className="mt-4 text-lg font-bold text-green-400">{submitMessage}</p>
      ) : (
        <form onSubmit={handleSubmitScore} className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-yellow-400">
            Trage dich in die Rangliste ein!
          </h3>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Dein Name"
            required
            className="w-full rounded bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={addScoreMutation.isPending}
          />
          <button
            type="submit"
            disabled={addScoreMutation.isPending || !playerName || score === 0}
            className="w-full rounded bg-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {addScoreMutation.isPending
              ? "Wird gespeichert..."
              : `Speichere ${score} Punkte`}
          </button>
          {submitMessage && !isSubmitted && (
            <p className="text-sm text-red-400">{submitMessage}</p>
          )}
        </form>
      )}

      <button
        onClick={() => window.location.reload()}
        className="mt-8 rounded-full bg-white px-8 py-2 font-bold text-black shadow-lg transition-transform hover:scale-105"
      >
        Neues Spiel
      </button>
    </div>
  );
}
