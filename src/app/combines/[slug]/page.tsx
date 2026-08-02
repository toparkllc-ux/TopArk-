import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/supabase/queries";
import { getCombineEventBySlug, formatEventDate, spotsRemaining } from "@/lib/combines/getCombineEvents";
import CombineRegisterButton from "@/components/combines/CombineRegisterButton";
import styles from "../combines.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getCombineEventBySlug(slug);
  if (!event) return { title: "Combine Not Found | TopArk" };
  return { title: `${event.title} | TopArk Combines`, description: event.description ?? undefined };
}

export default async function CombineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getCombineEventBySlug(slug);

  if (!event || !event.id) notFound();

  const current = await getCurrentUser();
  const viewer = current?.accountType === "athlete" ? "athlete" : current?.accountType === "team" ? "team" : "guest";

  let initialRegistered = false;
  if (viewer === "athlete" && current) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("combine_registrations")
      .select("id")
      .eq("event_id", event.id)
      .eq("athlete_id", current.user.id)
      .maybeSingle();
    initialRegistered = !!data;
  }

  const remaining = spotsRemaining(event);
  const full = remaining !== null && remaining <= 0;
  const closed = event.status === "closed" || (!!event.registration_deadline && new Date(event.registration_deadline) < new Date());

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          TOPARK
        </Link>
        <Link href="/combines" className={styles.navBack}>
          ← Back to Combines
        </Link>
      </nav>
      <div className={styles.detail}>
        <div className={styles.detailTag}>{closed ? "Registration Closed" : "Registration Open"}</div>
        <h1 className={styles.detailTitle}>{event.title}</h1>
        <div className={styles.detailMeta}>
          <div>📍 {event.location}</div>
          {event.event_date && <div>🗓 {formatEventDate(event.event_date)}</div>}
          {remaining !== null && <div>🎟 {full ? "No spots remaining" : `${remaining} of ${event.capacity} spots remaining`}</div>}
        </div>
        <div className={styles.detailBody}>{event.description}</div>

        <div className={styles.registerPanel}>
          <div className={styles.registerText}>
            {viewer === "athlete"
              ? "Register to lock in your spot — it'll show up on your TopArk calendar automatically."
              : "Create an athlete account to register for TopArk combines and get seen by international scouts."}
          </div>
          {event.id && (
            <CombineRegisterButton eventId={event.id} viewer={viewer} initialRegistered={initialRegistered} closed={closed} full={full} />
          )}
        </div>
      </div>
    </>
  );
}
