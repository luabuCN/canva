import { db } from "@/db";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { auth } from "@/auth";
const app = new Hono()
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
      z.object({
        name: z.string(),
        json: z.string(),
        width: z.number(),
        height: z.number(),
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
