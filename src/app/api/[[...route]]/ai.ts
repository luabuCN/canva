import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verifyAuth } from "@hono/auth-js";
import { z } from "zod";
import { uploadRemoteImage } from "../uploadthing/core";
const app = new Hono().post(
  "/generate-image",
  verifyAuth(),
  zValidator(
    "json",
    z.object({
      prompt: z.string(),
    })
  ),
  async (c) => {
    // 从请求中获取 prompt
    const { prompt } = c.req.valid("json");

    // 定义 API 请求参数
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer sk-izbhubqwzjotbkalcflwcmcjmegzpmhxxnwbozobkuxibgkr`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        model: "black-forest-labs/FLUX.1-schnell",
        prompt: prompt,
        image_size: "1024x1024",
        batch_size: 2,
        seed: 4999999999,
        num_inference_steps: 25,
        guidance_scale: 10,
        prompt_enhancement: true,
      }),
    };
    const response = await fetch(
      "https://api.siliconflow.cn/v1/images/generations",
      options
    );

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    const url = data.images?.[0]?.url;

    const urlData = await uploadRemoteImage(url);
    if (!urlData) {
      throw new Error("未生成图片 URL");
    }
    return c.json({ data: urlData });
  }
);

export default app;
