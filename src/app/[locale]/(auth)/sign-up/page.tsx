import SignUpCard from "@/app/features/auth/components/sign-up-card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return <SignUpCard />;
};

export default SignUpPage;
