"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/dashboard/dashboard.module.css";
import LogoutButton from "@/components/auth/LogoutButton";

const NAV_GROUPS = [
  {
    section: "Overview",
    items: [
      { href: "/admin", icon: "📊", label: "Dashboard" },
      { href: "/admin/activity", icon: "⚡", label: "Activity Feed" },
    ],
  },
  {
    section: "Users",
    items: [
      { href: "/admin/athletes", icon: "🏈", label: "Athletes" },
      { href: "/admin/teams", icon: "🏟️", label: "Teams" },
      { href: "/admin/verification", icon: "✅", label: "Verification Queue" },
    ],
  },
  {
    section: "Business",
    items: [
      { href: "/admin/signings", icon: "🤝", label: "Signings" },
      { href: "/admin/revenue", icon: "💰", label: "Revenue" },
    ],
  },
  {
    section: "Content",
    items: [
      { href: "/admin/content", icon: "📰", label: "News & Content" },
      { href: "/admin/combines", icon: "🎯", label: "Combines" },
    ],
  },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Image src="/logo.jpg" alt="TopArk" width={56} height={56} className={styles.sidebarLogoImg} />
      </div>
      <div className={styles.adminBadge}>
        🔒<span className={styles.adminBadgeText}>Admin Panel</span>
      </div>
      <nav className={styles.sidebarNav}>
        {NAV_GROUPS.map((group) => (
          <div key={group.section}>
            <div className={styles.navSection}>{group.section}</div>
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span> {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className={styles.sidebarBottom}>
        <div className={styles.sidebarUser}>
          <div className={styles.userAvatar}>{email.slice(0, 2).toUpperCase()}</div>
          <div>
            <div className={styles.userName}>{email}</div>
            <div className={styles.userPlan}>Founder Access</div>
          </div>
        </div>
        <LogoutButton className={styles.userPlan} />
      </div>
    </aside>
  );
}
