import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { checkAdmin } from "@/lib/supabase/admin";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import styles from "@/components/dashboard/dashboard.module.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loggedIn, isAdmin } = await checkAdmin();

  if (!loggedIn) redirect("/admin/login");
  if (!isAdmin) redirect("/login");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className={styles.body}>
      <AdminSidebar email={user?.email ?? "admin"} />
      <main className={styles.main}>
        <AdminTopbar />
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
