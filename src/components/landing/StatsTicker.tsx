import { Fragment } from "react";
import styles from "./landing.module.css";

const stats = [
  { num: "108+", label: "Player Signings" },
  { num: "45+", label: "Partner Teams" },
  { num: "10+", label: "Countries Reached" },
  { num: "6", label: "Years Pro Experience" },
];

export default function StatsTicker() {
  const doubled = [...stats, ...stats];
  return (
    <div className={styles.statsBar}>
      <div className={styles.statsTrack}>
        {doubled.map((stat, i) => (
          <Fragment key={i}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{stat.num}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
            <div className={styles.statDivider} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
