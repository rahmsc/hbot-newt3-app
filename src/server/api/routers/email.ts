import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emailRouter = createTRPCRouter({
  saveEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const existingEmail = await ctx.db.emails.findUnique({
          where: { email: input.email },
        });
        if (existingEmail) {
          console.log("Email already exists");
          return { success: false };
        }
        await ctx.db.emails.create({ data: { email: input.email } });
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }),
});
