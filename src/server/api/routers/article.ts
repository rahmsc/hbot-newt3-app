import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const articleRouter = createTRPCRouter({
  getArticles: publicProcedure.query(({ ctx }) => {
    return ctx.db.articles.findMany();
  }),
  getArticleById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.articles.findUnique({ where: { id: input.id } });
    }),
  getArticlesByCondition: publicProcedure
    .input(z.object({ condition: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.articles.findMany({
        where: { condition: input.condition },
      });
    }),
});
