import styles from "./landing.module.css";

const testimonials = [
  {
    body: "I had tryouts with three NFL practice squads and nothing materialized. TopArk got me in front of a team in Germany within two weeks. I've been playing professionally ever since.",
    name: "DARIUS M.",
    detail: "Wide Receiver · Signed 2025",
    country: "🇩🇪 Germany",
  },
  {
    body: "The difference between TopArk and other services is that they actually played the game. They knew exactly what coaches were looking for and positioned me the right way.",
    name: "MARCUS T.",
    detail: "Linebacker · Signed 2024",
    country: "🇫🇷 France",
  },
  {
    body: "I was ready to hang it up. TopArk gave me a real shot at continuing my career overseas. The process was fast, transparent, and they followed through every step of the way.",
    name: "BRANDON K.",
    detail: "Quarterback · Signed 2025",
    country: "🇸🇪 Sweden",
  },
  {
    body: "As a coach, I was skeptical about using a platform to find American imports. TopArk's verified profiles saved us months of back-and-forth. We found exactly who we needed.",
    name: "COACH SCHNEIDER",
    detail: "Head Coach · Partner Team",
    country: "🇦🇹 Austria",
  },
  {
    body: "TopArk isn't just a service — it's a community. They actually care about what happens to you after the signing. The follow-up and support is unlike anything else out there.",
    name: "JAYLEN R.",
    detail: "Running Back · Signed 2024",
    country: "🇲🇽 Mexico",
  },
  {
    body: "My daughter played college ball and couldn't get a look stateside. TopArk opened a door in Italy we didn't even know existed. She's been thriving for two seasons now.",
    name: "PARENT — T. WILLIAMS",
    detail: "Family of Athlete · Signed 2025",
    country: "🇮🇹 Italy",
  },
];

export default function Testimonials() {
  return (
    <section className={`${styles.section} ${styles.testimonials}`} id="testimonials">
      <div className={styles.testimonialsInner}>
        <div className={styles.sectionEyebrow}>Player Stories</div>
        <h2 className={styles.testimonialsHeadline}>
          REAL ATHLETES. <span className={styles.accent}>REAL RESULTS.</span>
        </h2>
        <p className={styles.testimonialsSub}>
          These are the players TopArk helped get on the field internationally.
        </p>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <div className={styles.tcard} key={t.name}>
              <div className={styles.tcardQuote}>&quot;</div>
              <p className={styles.tcardBody}>{t.body}</p>
              <div className={styles.tcardDivider} />
              <div className={styles.tcardAuthor}>
                <div className={styles.tcardName}>{t.name}</div>
                <div className={styles.tcardDetail}>{t.detail}</div>
                <div className={styles.tcardCountry}>{t.country}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
