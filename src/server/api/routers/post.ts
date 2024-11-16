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
      z.object({
        chapta: z.string(),
        guests: z
          .array(
            z.object({
              name: z.string().min(2),
              nachname: z.string().min(2),
              vegan: z.boolean(),
              wunsch: z.string(),
              hochstuhl: z.string(),
            }),
          )
          .min(1),
      }),
    )
    .mutation(async ({ input: { chapta, guests } }) => {
      const timestamp = new Date().toISOString();
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${chapta}`;

      const request = await fetch(url, {
        method: "post",
      });
      const response = (await request.json()) as { success: boolean };

      console.log(chapta);

      if (!response.success) {
        throw new Error("Invalid captcha");
      }

      await sheet.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        auth: auth,
        range: "Anmeldungen",
        valueInputOption: "RAW",
        requestBody: {
          values: guests.map(({ name, nachname, vegan, hochstuhl, wunsch }) => [
            timestamp,
            name,
            nachname,
            vegan,
            hochstuhl,
            wunsch,
          ]),
        },
      });
    }),
});
