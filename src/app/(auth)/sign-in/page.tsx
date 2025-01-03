import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return <div> Sign In Page</div>;
};

export default SignInPage;
