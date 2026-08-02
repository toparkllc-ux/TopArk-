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
      { href: "/team-dashboard", icon: "🏠", label: "Dashboard" },
      { href: "/team-dashboard/search", icon: "🔍", label: "Find Athletes" },
      { href: "/team-dashboard/roster", icon: "📋", label: "Roster Board" },
      { href: "/team-dashboard/messages", icon: "💬", label: "Messages" },
      { href: "/team-dashboard/calendar", icon: "📅", label: "Calendar" },
    ],
  },
  {
    section: "Tools",
    items: [
      { href: "/team-dashboard/interviews", icon: "🎤", label: "Interviews" },
      { href: "/team-dashboard/worldclock", icon: "🌍", label: "World Clock" },
      { href: "/news", icon: "📰", label: "News" },
    ],
  },
  {
    section: "Team",
    items: [{ href: "/team-dashboard/teamprofile", icon: "⚙️", label: "Team Profile" }],
  },
];

const PAGE_TITLES: Record<string, string> = {
  "/team-dashboard": "TEAM DASHBOARD",
  "/team-dashboard/search": "FIND ATHLETES",
  "/team-dashboard/roster": "ROSTER BOARD",
  "/team-dashboard/messages": "MESSAGES",
  "/team-dashboard/calendar": "CALENDAR",
  "/team-dashboard/interviews": "INTERVIEWS",
  "/team-dashboard/worldclock": "WORLD CLOCK",
  "/team-dashboard/teamprofile": "TEAM PROFILE",
};

export default async function TeamDashboardLayout({ children }: { children: React.ReactNode }) {
  const current = await getCurrentUser();

  if (!current) redirect("/login");
  if (current.accountType !== "team") redirect("/dashboard");

  const { profile } = current;
  const initials = (profile.team_name?.slice(0, 2) || "TA").toUpperCase();

  return (
    <div className={styles.body}>
      <Sidebar
        tierLabel="Account Type"
        tierName="TEAM / COACH"
        groups={NAV_GROUPS}
        userInitials={initials}
        userName={profile.team_name || "Your Team"}
        userPlan="Partner Team"
        accent="blue"
      />
      <main className={styles.main}>
        <Topbar
          titles={PAGE_TITLES}
          scheduleHref="/team-dashboard/search"
          scheduleLabel="+ Find Athletes"
          userId={current.user.id}
          accountType="team"
        />
        <div className={styles.content}>{children}</div>
      </main>
      <DashboardAIChatWidget />
    </div>
  );
}
