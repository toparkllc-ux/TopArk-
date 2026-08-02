import type { Metadata } from "next";
import AdminSignupForm from "./AdminSignupForm";

export const metadata: Metadata = {
  title: "Admin Access | TopArk",
};

export default function AdminSignupPage() {
  return <AdminSignupForm />;
}
