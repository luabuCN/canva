import { createApi } from "unsplash-js";

export const unsplash = createApi({
<<<<<<< HEAD
  // accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!, vercel 部署不生效
  accessKey: "WhmMbg_TC32FaHGel-Lpc1sFMbfEOemNCCpMGDkjgcM",
=======
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
>>>>>>> 7d17db0f8eac8e468aea769a1a7fbcb35f3cd8df
  fetch: fetch,
});
