import styles from "./landing.module.css";

const cards = [
  {
    title: "DIRECT ACCESS",
    body: "Athletes communicate directly with coaches and team decision-makers — no gatekeepers, no delays, no middlemen.",
  },
  {
    title: "VERIFIED PROFILES",
    body: "Every athlete profile is verified. Measurements, film, and credentials you can trust — not just self-reported stats.",
  },
  {
    title: "REAL PLACEMENTS",
    body: "108+ signings and counting. We don't just connect — we follow through until athletes are signed and on the field.",
  },
];

export default function Mission() {
  return (
    <section className={`${styles.section} ${styles.mission}`} id="mission">
      <div className={styles.missionInner}>
        <div>
          <div className={styles.sectionEyebrow}>Our Mission</div>
          <h2 className={styles.missionHeadline}>
            THE NFL ISN&apos;T
            <br />
            THE <span className={styles.accent}>ONLY</span> PATH.
          </h2>
          <p className={styles.missionBody}>
            TopArk was built by former professional players who played internationally
            across Europe and Mexico. We know what it takes — and we know the system
            doesn&apos;t make it easy. So we built the infrastructure that didn&apos;t
            exist when we needed it.
          </p>
          <button className={styles.btnPrimary}>Our Story</button>
        </div>
        <div className={styles.missionRight}>
          {cards.map((card) => (
            <div className={styles.missionCard} key={card.title}>
              <div className={styles.missionCardTitle}>{card.title}</div>
              <div className={styles.missionCardBody}>{card.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
