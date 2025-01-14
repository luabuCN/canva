import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

const app = new Hono().post("/checkout", verifyAuth(), async (c) => {
  const session = await auth();
  if (!session?.user?.id) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const subscription = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=1`,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: session.user.email || "",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
    },
  });

  const url = subscription.url;
  if (!url) {
    return c.json({ error: "Something went wrong" }, 400);
  }
  return c.json({ data: url });
});

export default app;
