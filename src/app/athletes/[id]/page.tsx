import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/supabase/queries";
import { cmToFeetInches, kgToLbs } from "@/lib/measurements";
import styles from "../athletes.module.css";
import StartConversationButton from "@/components/messaging/StartConversationButton";
import RequestInterviewButton from "@/components/messaging/RequestInterviewButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: athlete } = await supabase.from("athlete_directory").select("*").eq("id", id).single();

  if (!athlete) return { title: "Athlete Not Found | TopArk" };

  const fullName = [athlete.first_name, athlete.last_name].filter(Boolean).join(" ") || "TopArk Athlete";
  return {
    title: `${fullName} | TopArk`,
    description: `${fullName} — ${athlete.position || "Athlete"} on TopArk.`,
  };
}

export default async function AthleteProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: athlete } = await supabase.from("athlete_directory").select("*").eq("id", id).single();

  if (!athlete) notFound();

  const initials = `${athlete.first_name?.[0] ?? ""}${athlete.last_name?.[0] ?? ""}`.toUpperCase() || "TA";
  const fullName = [athlete.first_name, athlete.last_name].filter(Boolean).join(" ") || "TopArk Athlete";

  const current = await getCurrentUser();
  const viewerTeamId = current?.accountType === "team" ? current.user.id : null;

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          Top<span style={{ color: "var(--white)" }}>Ark</span>
        </Link>
        <Link href="/team-dashboard/search" className={styles.navBack}>
          ← Back to Search
        </Link>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <div className={styles.name}>{fullName.toUpperCase()}</div>
            <div className={styles.position}>{athlete.position || "Position TBD"}</div>
            {athlete.verification_status === "verified" && (
              <div className={styles.verified}>✓ Verified Athlete</div>
            )}
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{cmToFeetInches(athlete.height_cm)}</div>
            <div className={styles.statLabel}>Height</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{kgToLbs(athlete.weight_kg)}</div>
            <div className={styles.statLabel}>Weight (lbs)</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{athlete.forty_yard_dash ?? "—"}</div>
            <div className={styles.statLabel}>40-Yard Dash</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{athlete.country || "—"}</div>
            <div className={styles.statLabel}>Country</div>
          </div>
        </div>

        {athlete.bio && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>ABOUT</div>
            <p className={styles.bio}>{athlete.bio}</p>
          </div>
        )}

        {athlete.highlight_url && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>FILM</div>
            <a href={athlete.highlight_url} target="_blank" rel="noopener noreferrer" className={styles.filmLink}>
              🎥 Watch Highlight Film →
            </a>
          </div>
        )}

        {viewerTeamId && athlete.id ? (
          <div className={styles.ctaPanel}>
            <div className={styles.ctaText}>
              Reach out to {athlete.first_name || "this athlete"} directly.
            </div>
            <div className={styles.ctaActions}>
              <StartConversationButton athleteId={athlete.id} teamId={viewerTeamId} className={styles.btnPrimary} />
              <RequestInterviewButton
                athleteId={athlete.id}
                teamId={viewerTeamId}
                athleteName={athlete.first_name || fullName}
                className={styles.btnSecondary}
              />
            </div>
          </div>
        ) : (
          <div className={styles.ctaPanel}>
            <div className={styles.ctaText}>
              Sign in as a verified team or coach to message {athlete.first_name || "this athlete"} directly or
              request an interview.
            </div>
            <div className={styles.ctaActions}>
              <Link href="/login" className={styles.btnPrimary}>
                Team Log In
              </Link>
              <Link href="/signup" className={styles.btnSecondary}>
                Partner With TopArk
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
