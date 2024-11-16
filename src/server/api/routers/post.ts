import { google } from "googleapis";
import { z } from "zod";
import { env } from "~/env";

const { SERVICE_ACCOUNT_EMAIL, SERVICE_ACCOUNT_PRIVATE_KEY, SHEET_ID } = env;

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const auth = new google.auth.JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: SERVICE_ACCOUNT_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheet = google.sheets("v4");

export const anmeldungRouter = createTRPCRouter({
  anmelden: publicProcedure
    .input(
      z
        .array(
          z.object({
            name: z.string(),
            nachname: z.string(),
            vegan: z.boolean(),
            wunsch: z.string(),
          }),
        )
        .min(1),
    )
    .mutation(async ({ input: list }) => {
      const timestamp = new Date().toISOString();
      await sheet.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        auth: auth,
        range: "Anmeldungen",
        valueInputOption: "RAW",
        requestBody: {
          values: list.map(({ name, nachname, vegan, wunsch }) => [
            timestamp,
            name,
            nachname,
            vegan,
            wunsch,
          ]),
        },
      });
    }),
});
