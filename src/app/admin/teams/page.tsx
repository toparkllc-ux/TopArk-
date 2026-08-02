import { createClient } from "@/lib/supabase/server";
import styles from "@/components/dashboard/dashboard.module.css";

export default async function AdminTeamsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("team_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const teams = data ?? [];

  return (
    <>
      <div style={{ fontSize: 13, color: "var(--gray)", marginBottom: 20 }}>{teams.length} partner team accounts.</div>
      <div className={styles.card}>
        {teams.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--gray)" }}>No teams have signed up yet.</div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Team</th>
                <th>Contact</th>
                <th>League</th>
                <th>Country</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.team_name}</strong>
                  </td>
                  <td>{t.contact_name}</td>
                  <td>{t.league ?? "—"}</td>
                  <td>{t.country ?? "—"}</td>
                  <td>{t.email}</td>
                  <td>{new Date(t.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
