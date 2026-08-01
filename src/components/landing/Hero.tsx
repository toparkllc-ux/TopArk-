import Link from "next/link";
import styles from "./landing.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.fieldLines} />
      <div className={styles.heroEyebrow}>Built by Players. Built for Players.</div>
      <h1 className={styles.heroHeadline}>
        YOUR GAME.
        <br />
        YOUR <span className={styles.accent}>WORLD.</span>
      </h1>
      <p className={styles.heroSub}>
        TopArk connects American football athletes with professional opportunities across
        the globe — verified, direct, and built on real experience.
      </p>
      <div className={styles.heroActions}>
        <Link href="/signup">
          <button className={styles.btnPrimary}>Create Athlete Profile</button>
        </Link>
        <a href="#membership">
          <button className={styles.btnSecondary}>Browse Teams</button>
        </a>
      </div>
    </section>
  );
}
