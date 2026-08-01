import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "@/components/dashboard/dashboard.module.css";
import { cmToFeetInches, kgToLbs } from "@/lib/measurements";
import SearchFilters from "./SearchFilters";

export default async function FindAthletesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; position?: string; verified?: string; film?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("athlete_directory").select("*").limit(60);

  if (params.q) {
    query = query.or(`first_name.ilike.%${params.q}%,last_name.ilike.%${params.q}%`);
  }
  if (params.position) {
    query = query.eq("position", params.position);
  }
  if (params.verified === "1") {
    query = query.eq("verification_status", "verified");
  }
  if (params.film === "1") {
    query = query.not("highlight_url", "is", null);
  }

  const { data: athletes } = await query.order("created_at", { ascending: false });
  const results = athletes ?? [];

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div className={styles.eyebrow}>Athlete Database</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 1 }}>
          FIND <span style={{ color: "var(--gold)" }}>ATHLETES</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 4 }}>
          Search TopArk&apos;s athlete database. Filter by position and verification status.
        </div>
      </div>

      <SearchFilters />

      <div style={{ fontSize: 12, color: "var(--gray)", marginBottom: 12 }}>
        Showing <strong style={{ color: "var(--gold)" }}>{results.length}</strong> athlete
        {results.length === 1 ? "" : "s"}
      </div>

      {results.length === 0 ? (
        <div className={styles.card}>
          <div style={{ fontSize: 13, color: "var(--gray)" }}>
            No athletes match your search yet. Try clearing filters.
          </div>
        </div>
      ) : (
        <div className={styles.playerGrid}>
          {results.map((athlete) => {
            const initials = `${athlete.first_name?.[0] ?? ""}${athlete.last_name?.[0] ?? ""}`.toUpperCase() || "TA";
            const fullName = [athlete.first_name, athlete.last_name].filter(Boolean).join(" ") || "Unnamed Athlete";
            return (
              <div className={styles.playerCard} key={athlete.id}>
                <div className={styles.playerTop}>
                  <div className={styles.playerAvatar}>{initials}</div>
                  <div>
                    <div className={styles.playerName}>{fullName.toUpperCase()}</div>
                    <div className={styles.playerPos}>{athlete.position || "Position TBD"}</div>
                    {athlete.verification_status === "verified" && (
                      <div className={styles.playerVerified}>✓ Verified</div>
                    )}
                  </div>
                </div>
                <div className={styles.playerStats}>
                  <div className={styles.playerStat}>
                    <div className={styles.playerStatVal}>{cmToFeetInches(athlete.height_cm)}</div>
                    <div className={styles.playerStatLabel}>Height</div>
                  </div>
                  <div className={styles.playerStat}>
                    <div className={styles.playerStatVal}>{kgToLbs(athlete.weight_kg)}</div>
                    <div className={styles.playerStatLabel}>Weight</div>
                  </div>
                  <div className={styles.playerStat}>
                    <div className={styles.playerStatVal}>{athlete.forty_yard_dash ?? "—"}</div>
                    <div className={styles.playerStatLabel}>40-Yard</div>
                  </div>
                  <div className={styles.playerStat}>
                    <div className={styles.playerStatVal}>{athlete.country ? "🌍" : "—"}</div>
                    <div className={styles.playerStatLabel}>{athlete.country || "Country"}</div>
                  </div>
                </div>
                <div className={styles.playerTags}>
                  {athlete.country && <span className={styles.playerTag}>{athlete.country}</span>}
                  {athlete.highlight_url && <span className={styles.playerTag}>🎥 Film</span>}
                </div>
                <div className={styles.playerActions}>
                  <Link href={`/athletes/${athlete.id}`} className={`${styles.playerBtn} ${styles.playerBtnMessage}`}>
                    View Profile
                  </Link>
                  <button className={`${styles.playerBtn} ${styles.playerBtnOutline}`}>Interview</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
