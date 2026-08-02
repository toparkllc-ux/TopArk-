import type { Metadata } from "next";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Log In | TopArk",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
