import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { locales } from "./config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

export default async function middleware(req: any, ev: any) {
  // 先执行 auth 中间件
  const authResponse = await auth(req, ev);
  if (authResponse) {
    // 如果 auth 中间件返回响应（如未授权），直接返回
    return authResponse;
  }

  // 再执行国际化中间件
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(cn|en)/:path*"], // 使用相同的 matcher
};
