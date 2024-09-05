import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const blogRouter = createTRPCRouter({
  getBlogs: publicProcedure.query(({ ctx }) => {
    return ctx.db.blogs.findMany();
  }),
  getBlogById: publicProcedure.input(z.number()).query(({ input, ctx }) => {
    return ctx.db.blogs.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
