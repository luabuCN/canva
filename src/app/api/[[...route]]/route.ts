import { Hono, Context } from "hono";
import { handle } from "hono/vercel";
import images from "./images";
import ai from "./ai";
import users from "./users";
import { initAuthConfig, type AuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";
export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: process.env.AUTH_SECRET,
    ...(authConfig as any),
  };
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/ai", ai)
  .route("/images", images)
  .route("/users", users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
