import Link from "next/link";
import styles from "./landing.module.css";
import { getPublishedNewsPosts, formatNewsMeta } from "@/lib/news/getNewsPosts";

export default async function News() {
  const posts = await getPublishedNewsPosts(5);

  if (posts.length === 0) return null;

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
          <Link href="/news" className={styles.newsLink}>
            View All Stories →
          </Link>
        </div>
        <div className={styles.newsGrid}>
          {posts.map((post, i) => (
            <Link
              className={`${styles.newsCard} ${i === 0 ? styles.newsCardFeatured : ""}`}
              href={`/news/${post.slug}`}
              key={post.id}
            >
              <div className={styles.newsTag}>{post.tag}</div>
              <div className={styles.newsTitle}>{post.title}</div>
              <div className={styles.newsExcerpt}>{post.excerpt}</div>
              <div className={styles.newsMeta}>{formatNewsMeta(post)}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
