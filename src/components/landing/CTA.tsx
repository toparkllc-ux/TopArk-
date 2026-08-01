import Link from "next/link";
import styles from "./landing.module.css";

export default function CTA() {
  return (
    <section className={styles.section} id="combine">
      <div className={styles.ctaSection}>
        <div className={styles.sectionEyebrow}>Next Step</div>
        <h2 className={styles.ctaHeadline}>
          READY TO
          <br />
          <span className={styles.accent}>LEVEL UP?</span>
        </h2>
        <p className={styles.ctaSub}>
          Whether you&apos;re an athlete looking for your next contract or a team
          building your roster — TopArk is your platform.
        </p>
        <div className={styles.ctaActions}>
          <Link href="/signup">
            <button className={styles.btnPrimary}>Join as an Athlete</button>
          </Link>
          <Link href="/signup">
            <button className={styles.btnSecondary}>Partner as a Team</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
