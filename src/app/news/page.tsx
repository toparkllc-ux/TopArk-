import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedNewsPosts, formatNewsMeta } from "@/lib/news/getNewsPosts";
import styles from "./news.module.css";

export const metadata: Metadata = {
  title: "News | TopArk",
  description: "The latest updates, signings, and announcements from TopArk.",
};

export default async function NewsPage() {
  const posts = await getPublishedNewsPosts();

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          TOPARK
        </Link>
        <Link href="/" className={styles.navBack}>
          ← Back to Home
        </Link>
      </nav>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Latest Updates</div>
        <div className={styles.headline}>
          TOPARK <span className={styles.accent}>NEWS.</span>
        </div>
        {posts.length === 0 ? (
          <div className={styles.empty}>No stories published yet — check back soon.</div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link className={styles.card} href={`/news/${post.slug}`} key={post.id}>
                <div className={styles.tag}>{post.tag}</div>
                <div className={styles.title}>{post.title}</div>
                <div className={styles.excerpt}>{post.excerpt}</div>
                <div className={styles.meta}>{formatNewsMeta(post)}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
