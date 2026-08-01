"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard.module.css";
import NotificationBell from "./NotificationBell";

export default function Topbar({
  titles,
  scheduleHref,
  scheduleLabel = "+ Schedule",
  userId,
  accountType,
}: {
  titles: Record<string, string>;
  scheduleHref?: string;
  scheduleLabel?: string;
  userId: string;
  accountType: "athlete" | "team";
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
        <NotificationBell userId={userId} accountType={accountType} />
      </div>
    </div>
  );
}
