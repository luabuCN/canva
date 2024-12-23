import { createApi } from "unsplash-js";

export const unsplash = createApi({
  // accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!, vercel 部署不生效
  accessKey: "WhmMbg_TC32FaHGel-Lpc1sFMbfEOemNCCpMGDkjgcM",
  fetch: fetch,
});
