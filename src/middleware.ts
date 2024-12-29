import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { locales } from "./config";

// 创建国际化中间件
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

export async function middleware(req: any) {
  const intlRes = await intlMiddleware(req);
  if (intlRes) {
    return intlRes;
  }
  return await auth(req);
}

// 匹配器配置
export const config = {
  matcher: ["/", "/(cn|en)/:path*"],
};
