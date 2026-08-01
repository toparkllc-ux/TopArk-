import styles from "./landing.module.css";

const articles = [
  {
    tag: "🏈 Featured",
    title: "TopArk Reaches 108 Player Signings Across 10+ Countries",
    excerpt:
      "What started as a mission to create pathways for overlooked athletes has turned into a global movement. Founder Noah Whittle reflects on the milestone and what comes next for the platform.",
    meta: "June 2026 · TopArk HQ",
    featured: true,
  },
  {
    tag: "🌍 International",
    title: "New Partner Teams Added in Germany & Sweden",
    excerpt:
      "TopArk expands its European network with 6 new partner teams ahead of the fall season.",
    meta: "May 2026",
  },
  {
    tag: "🎯 Combine",
    title: "Georgetown International Combine — Registration Now Open",
    excerpt:
      "Athletes from across the country are invited to the next TopArk non-contact combine in Georgetown, TX.",
    meta: "April 2026",
  },
  {
    tag: "📱 Platform",
    title: "TopArk App in Development — Beta Sign-Ups Open",
    excerpt:
      "The full TopArk platform is coming — athlete profiles, team dashboards, instant messaging, and more.",
    meta: "March 2026",
  },
  {
    tag: "🥊 Expansion",
    title: "TopArk Promotions — Combat Sports Division Announced",
    excerpt:
      "TopArk expands beyond football with a new combat sports promotion arm targeting boxing and MMA athletes.",
    meta: "February 2026",
  },
];

export default function News() {
  return (
    <section className={`${styles.section} ${styles.news}`} id="news">
      <div className={styles.newsInner}>
        <div className={styles.newsHeader}>
          <div>
            <div className={styles.sectionEyebrow}>Latest Updates</div>
            <h2 className={styles.newsHeadline}>
              TOPARK <span className={styles.accent}>NEWS.</span>
            </h2>
          </div>
          <a href="#" className={styles.newsLink}>
            View All Stories →
          </a>
        </div>
        <div className={styles.newsGrid}>
          {articles.map((article) => (
            <div
              className={`${styles.newsCard} ${article.featured ? styles.newsCardFeatured : ""}`}
              key={article.title}
            >
              <div className={styles.newsTag}>{article.tag}</div>
              <div className={styles.newsTitle}>{article.title}</div>
              <div className={styles.newsExcerpt}>{article.excerpt}</div>
              <div className={styles.newsMeta}>{article.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
