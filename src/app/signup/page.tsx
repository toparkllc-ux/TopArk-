import type { Metadata } from "next";
import SignupWizard from "./SignupWizard";

export const metadata: Metadata = {
  title: "Create Your Account | TopArk",
  description: "Join TopArk as an athlete or a team/coach.",
};

export default function SignupPage() {
  return <SignupWizard />;
}
