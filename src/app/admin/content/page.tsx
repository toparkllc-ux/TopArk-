import { createClient } from "@/lib/supabase/server";
import ContentClient from "./ContentClient";
import styles from "@/components/dashboard/dashboard.module.css";

export default async function AdminContentPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("news_posts").select("*").order("created_at", { ascending: false });

  return (
    <>
      <div className={styles.eyebrow}>Content Management</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 1, marginBottom: 20 }}>
        NEWS &amp; <span style={{ color: "var(--gold)" }}>CONTENT</span>
      </div>
      <ContentClient initialPosts={data ?? []} />
    </>
  );
}
