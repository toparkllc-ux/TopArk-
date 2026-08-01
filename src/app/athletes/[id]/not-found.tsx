import Link from "next/link";
import styles from "../athletes.module.css";

export default function AthleteNotFound() {
  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          Top<span style={{ color: "var(--white)" }}>Ark</span>
        </Link>
        <Link href="/" className={styles.navBack}>
          ← Back to TopArk
        </Link>
      </nav>
      <div className={styles.notFound}>
        <div className={styles.notFoundTitle}>ATHLETE NOT FOUND</div>
        <p style={{ color: "var(--gray)", fontSize: 14 }}>
          This profile doesn&apos;t exist or is no longer available.
        </p>
      </div>
    </>
  );
}
