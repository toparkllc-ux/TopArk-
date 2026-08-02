import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import styles from "@/components/dashboard/dashboard.module.css";

export default async function AdminAthletesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("athlete_directory")
    .select("*")
    .order("created_at", { ascending: false });

  const athletes = data ?? [];

  return (
    <>
      <div style={{ fontSize: 13, color: "var(--gray)", marginBottom: 20 }}>{athletes.length} registered athlete profiles.</div>
      <div className={styles.card}>
        {athletes.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--gray)" }}>No athletes have signed up yet.</div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Country</th>
                <th>Tier</th>
                <th>Verification</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {athletes.map((a) => (
                <tr key={a.id}>
                  <td>
                    <strong>{[a.first_name, a.last_name].filter(Boolean).join(" ") || "Unnamed Athlete"}</strong>
                  </td>
                  <td>{a.position ?? "—"}</td>
                  <td>{a.country ?? "—"}</td>
                  <td style={{ textTransform: "capitalize" }}>{a.membership_tier}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        a.verification_status === "verified" ? styles.statusPublished : styles.statusDraft
                      }`}
                    >
                      {a.verification_status}
                    </span>
                  </td>
                  <td>{a.created_at ? new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}</td>
                  <td>
                    {a.id && (
                      <Link className={styles.btnSm} href={`/athletes/${a.id}`} target="_blank">
                        View Profile
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
