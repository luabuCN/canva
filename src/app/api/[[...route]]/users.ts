import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(3).max(20),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");
    const hashedPassword = await bcrypt.hash(password, 12);
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return c.json({ error: "User already exists" }, 400);
    }
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return c.json(null, 200);
  }
);

export default app;
