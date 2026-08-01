"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard.module.css";

export default function Topbar({
  titles,
  scheduleHref,
  scheduleLabel = "+ Schedule",
}: {
  titles: Record<string, string>;
  scheduleHref?: string;
  scheduleLabel?: string;
}) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "DASHBOARD";

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarTitle}>{title}</div>
      <div className={styles.topbarRight}>
        {scheduleHref && (
          <Link href={scheduleHref}>
            <button className={styles.topbarBtn}>{scheduleLabel}</button>
          </Link>
        )}
        <div className={styles.topbarNotif}>
          🔔<span className={styles.notifDot} />
        </div>
      </div>
    </div>
  );
}
