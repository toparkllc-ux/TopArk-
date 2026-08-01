import styles from "./landing.module.css";

const countries = [
  "🇩🇪 Germany",
  "🇫🇷 France",
  "🇸🇪 Sweden",
  "🇮🇹 Italy",
  "🇪🇸 Spain",
  "🇦🇹 Austria",
  "🇨🇿 Czech Republic",
  "🇲🇽 Mexico",
  "🇵🇱 Poland",
  "🇩🇰 Denmark",
  "+ More",
];

export default function Countries() {
  return (
    <section className={`${styles.section} ${styles.sports}`} id="countries">
      <div className={styles.sportsInner}>
        <div className={styles.sectionEyebrow}>Global Reach</div>
        <h2 className={styles.sportsHeadline}>
          10+ COUNTRIES. <span className={styles.accent}>ONE ARK.</span>
        </h2>
        <p className={styles.sportsSub}>
          TopArk has placed athletes across leagues in Europe, Latin America, and beyond.
        </p>
        <div className={styles.countriesGrid}>
          {countries.map((country) => (
            <div className={styles.countryTag} key={country}>
              {country}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
