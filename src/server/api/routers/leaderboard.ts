// src/server/api/routers/leaderboard.ts

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
// Stellen Sie sicher, dass Sie den Prisma-Client über den Context (ctx) importieren können.
// Dies hängt von Ihrem Setup ab, typischerweise in `createContext.ts` oder direkt im Router.

export const leaderboardRouter = createTRPCRouter({
  /**
   * Ruft die Top-Scores ab, sortiert nach Punkten (absteigend) und Datum.
   */
  getTopScores: protectedProcedure
    .input(z.object({ limit: z.number().optional() }).optional())
    .query(async ({ ctx, input }) => {
      // Async-Funktion und Zugriff auf ctx
      const limit = input?.limit ?? 10;

      const topScores = await ctx.db.leaderboardEntry.findMany({
        take: limit,
        orderBy: [
          { score: "desc" }, // Hauptsortierung: Höchster Score zuerst
          { createdAt: "asc" }, // Sekundärsortierung: Bei gleichem Score: Älterer Eintrag zuerst
        ],
      });

      // Wir müssen die `LeaderboardEntry`-Typen hier nicht manuell definieren,
      // da Prisma sie automatisch zurückgibt.
      return topScores;
    }),

  /**
   * Fügt einen neuen Score zur Rangliste hinzu.
   */
  addScore: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(2, "Name muss mindestens 2 Zeichen lang sein")
          .max(50),
        score: z.number().int().min(1, "Score muss mindestens 1 sein"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Async-Funktion und Zugriff auf ctx
      const newEntry = await ctx.db.leaderboardEntry.create({
        data: {
          name: input.name,
          score: input.score,
        },
      });

      return newEntry;
    }),
});
