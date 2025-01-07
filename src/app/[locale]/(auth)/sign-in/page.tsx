import SignInCard from "@/app/features/auth/components/sign-in-card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const SignInPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return <SignInCard />;
};

export default SignInPage;
