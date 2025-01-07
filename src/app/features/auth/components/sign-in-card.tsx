"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();
  const error = params.get("error");
  const t = useTranslations("login");
  const onCredentialsSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };
  const onProviderSignIn = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0 pb-3">
        <CardTitle>{t("login")}</CardTitle>
        <CardDescription>{t("login-account")}</CardDescription>
      </CardHeader>
      {!!error && (
        <div className=" bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{t("invalid")}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialsSignIn} className="space-y-2.5">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email")}
            type="email"
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
            type="password"
            required
          />
          <Button type="submit" size="lg" className="w-full">
            {t("login")}
          </Button>
        </form>
        <Separator />
        <div className=" gap-y-2.5 flex flex-col">
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => onProviderSignIn("github")}
          >
            <FaGithub
              className="mr-2 top-2.5 left-2.5 absolute"
              style={{ width: "1.5em", height: "1.5em" }}
            />
            {t("github")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => onProviderSignIn("google")}
          >
            <FcGoogle
              className="mr-2  top-2.5 left-2.5 absolute"
              style={{ width: "1.5em", height: "1.5em" }}
            />
            {t("google")}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {t("have-account")}
          <Link href="/sign-up">
            <span className=" text-sky-700 hover:underline">{t("signup")}</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
