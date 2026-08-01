import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/queries";
import Sidebar, { type NavGroup } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import DashboardAIChatWidget from "@/components/dashboard/DashboardAIChatWidget";
import styles from "@/components/dashboard/dashboard.module.css";

const NAV_GROUPS: NavGroup[] = [
  {
    section: "Main",
    items: [
      { href: "/dashboard", icon: "🏠", label: "Dashboard" },
      { href: "/dashboard/messages", icon: "💬", label: "Messages" },
      { href: "/dashboard/calendar", icon: "📅", label: "Calendar" },
    ],
  },
  {
    section: "Community",
    items: [{ href: "/dashboard/community", icon: "🌐", label: "Community Chat" }],
  },
  {
    section: "Profile",
    items: [
      { href: "/dashboard/profile", icon: "👤", label: "My Profile" },
      { href: "/dashboard/worldclock", icon: "🌍", label: "World Clock" },
      { href: "/dashboard/membership", icon: "👑", label: "Membership" },
    ],
  },
];

const TIER_NAMES: Record<string, string> = {
  free: "FREE",
  elite: "ELITE ⚡",
  pro_ark: "PRO ARK 👑",
};

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "DASHBOARD",
  "/dashboard/messages": "MESSAGES",
  "/dashboard/calendar": "CALENDAR",
  "/dashboard/community": "COMMUNITY CHAT",
  "/dashboard/profile": "MY PROFILE",
  "/dashboard/worldclock": "WORLD CLOCK",
  "/dashboard/membership": "MEMBERSHIP",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const current = await getCurrentUser();

  if (!current) redirect("/login");
  if (current.accountType !== "athlete") redirect("/team-dashboard");

  const { profile } = current;
  const initials =
    `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase() || "TA";
  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "Athlete";
  const tierName = TIER_NAMES[profile.membership_tier] ?? "FREE";

  return (
    <div className={styles.body}>
      <Sidebar
        tierLabel="Your Plan"
        tierName={tierName}
        groups={NAV_GROUPS}
        userInitials={initials}
        userName={fullName}
        userPlan={`${profile.membership_tier === "free" ? "Free" : profile.membership_tier === "elite" ? "Elite" : "Pro Ark"} Member`}
      />
      <main className={styles.main}>
        <Topbar
          titles={PAGE_TITLES}
          scheduleHref="/dashboard/calendar"
          userId={current.user.id}
          accountType="athlete"
        />
        <div className={styles.content}>{children}</div>
      </main>
      <DashboardAIChatWidget />
    </div>
  );
}
