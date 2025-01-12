import { db } from "@/db";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { auth } from "@/auth";
const projectsInsertSchema = z.object({
  id: z.string(),
  json: z.string(),
  name: z.string(),
  userId: z.string(),
  height: z.number(),
  width: z.number(),
  thumbnailUrl: z.string().nullable(),
  isTemplate: z.boolean().nullable(),
  isPro: z.boolean().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
const app = new Hono()
  .get(
    "/templates",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const { page, limit } = c.req.valid("query");
      const data = await db.project.findMany({
        where: {
          isTemplate: true,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: [{ isPro: "asc" }, { updatedAt: "desc" }],
      });

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const session = await auth();
      const { id } = c.req.valid("param");
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const project = await db.project.delete({
        where: {
          id,
          userId: session.user.id,
        },
      });
      if (!project) {
        return c.json({ error: "Project not found" }, 404);
      }
      return c.json({ data: { id } });
    }
  )
  .post(
    "/:id/duplicate",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const session = await auth();
      const { id } = c.req.valid("param");
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const project = await db.project.findFirst({
        where: {
          id,
          userId: session.user.id,
        },
      });
      if (!project) {
        return c.json({ error: "Project not found" }, 404);
      }
      const duplicateProject = await db.project.create({
        data: {
          name: `Copy of ${project.name}`,
          json: project.json,
          width: project.width,
          height: project.height,
          userId: session.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return c.json({ data: duplicateProject });
    }
  )
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const session = await auth();
      const { page, limit } = c.req.valid("query");
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db.project.findMany({
        where: {
          userId: session.user.id,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          updatedAt: "desc",
        },
      });
      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial()
    ),
    async (c) => {
      const session = await auth();
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db.project.update({
        where: {
          id,
          userId: session.user.id,
        },
        data: {
          ...values,
          updatedAt: new Date(),
        },
      });
      if (!data) {
        return c.json({ error: "Project not found" }, 404);
      }
      return c.json(data);
    }
  )
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const session = await auth();
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db.project.findUnique({
        where: {
          id,
          userId: session.user.id,
        },
      });
      if (!data) {
        return c.json({ error: "Project not found" }, 404);
      }
      return c.json({ data });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      projectsInsertSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true,
      })
    ),
    async (c) => {
      const session = await auth();
      const { name, json, width, height } = c.req.valid("json");
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db.project.create({
        data: {
          name,
          json,
          width,
          height,
          userId: session.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      if (!data) {
        return c.json({ error: "Something went wrong" }, 400);
      }

      return c.json({ data });
    }
  );

export default app;
