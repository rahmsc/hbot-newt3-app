import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Resend } from "resend";
import { EmailTemplate } from "~/components/email-template";

export const guidesRouter = createTRPCRouter({
  subscribeToProviderGuides: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
      const { email } = input;
      const resend = new Resend(process.env.RESEND_API_KEY);

      const userExists = await ctx.db.emails.findFirst({
        where: { email: email },
      });
      if (userExists) {
        throw new Error(`Email ${email} has already subscribed to guides`);
      }
      if (!userExists) {
        try {
          await ctx.db.emails.create({ data: { email: email } });
          console.log("Email has been subscribed");
          await resend.emails.send({
            from: "danmilad@gmail.com",
            to: "delivered@resend.dev",
            subject: "Hello world",
            react: EmailTemplate({ firstName: "Dan" }),
          });
          console.log("Email has been sent");
        } catch (error) {
          console.error(error);
          throw new Error(`Failed to subscribe email ${email}`);
        }
      }
    }),
});
