"use client";

import { usePathname } from "next/navigation";
import styles from "@/components/dashboard/dashboard.module.css";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "ADMIN DASHBOARD",
  "/admin/activity": "ACTIVITY FEED",
  "/admin/athletes": "ATHLETES",
  "/admin/teams": "TEAMS",
  "/admin/verification": "VERIFICATION QUEUE",
  "/admin/signings": "SIGNINGS",
  "/admin/revenue": "REVENUE",
  "/admin/content": "NEWS & CONTENT",
  "/admin/combines": "COMBINES",
};

export default function AdminTopbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "ADMIN";

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarTitle}>{title}</div>
      <div className={styles.topbarRight}>
        <div className={styles.topbarLive}>
          <span className={styles.liveDot} /> Live Data
        </div>
      </div>
    </div>
  );
}
