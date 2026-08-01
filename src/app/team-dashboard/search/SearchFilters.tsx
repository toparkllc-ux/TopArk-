"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import styles from "@/components/dashboard/dashboard.module.css";

const POSITIONS = [
  "Quarterback", "Running Back", "Wide Receiver", "Tight End", "Offensive Lineman",
  "Defensive Lineman", "Linebacker", "Cornerback", "Safety", "Kicker / Punter",
];

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const position = searchParams.get("position") ?? "";
  const verified = searchParams.get("verified") === "1";
  const film = searchParams.get("film") === "1";

  function updateParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <div className={styles.searchBar}>
        <input
          className={`${styles.formInput} ${styles.searchBarInput}`}
          type="text"
          placeholder="Search by name..."
          defaultValue={q}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateParams({ q: (e.target as HTMLInputElement).value });
          }}
        />
        <select
          className={`${styles.formSelect} ${styles.searchBarSelect}`}
          value={position}
          onChange={(e) => updateParams({ position: e.target.value })}
        >
          <option value="">All Positions</option>
          {POSITIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button className={styles.btnPrimary} onClick={() => updateParams({})}>
          Search
        </button>
      </div>
      <div className={styles.filterTags}>
        <span
          className={`${styles.filterTag} ${!verified && !film ? styles.filterTagActive : ""}`}
          onClick={() => updateParams({ verified: null, film: null })}
        >
          All
        </span>
        <span
          className={`${styles.filterTag} ${verified ? styles.filterTagActive : ""}`}
          onClick={() => updateParams({ verified: verified ? null : "1" })}
        >
          Verified Only
        </span>
        <span
          className={`${styles.filterTag} ${film ? styles.filterTagActive : ""}`}
          onClick={() => updateParams({ film: film ? null : "1" })}
        >
          Film Available
        </span>
      </div>
    </>
  );
}
