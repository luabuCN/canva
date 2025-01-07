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
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSignUp } from "../hook/use-sign-up";
import { TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
const SignUpCard = () => {
  const mutation = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();
  const error = params.get("error");
  const t = useTranslations("login");
  const onCredentialsSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
        },
      }
    );
  };
  const onProviderSignIn = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>{t("register")}</CardTitle>
        <CardDescription>{t("create-account")}</CardDescription>
      </CardHeader>
      {!!error && (
        <div className=" bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{t("wrong")}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialsSignIn} className="space-y-2.5">
          <Input
            disabled={mutation.isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name")}
            type="text"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email")}
            type="email"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
            type="password"
            required
            minLength={3}
            maxLength={20}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={mutation.isPending}
          >
            {t("register")}
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
          {t("already-account")}
          <Link href="/sign-in">
            <span className=" text-sky-700 hover:underline">{t("signin")}</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
