import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPublishedNewsPostBySlug, formatNewsMeta } from "@/lib/news/getNewsPosts";
import styles from "../news.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedNewsPostBySlug(slug);
  if (!post) return { title: "Story Not Found | TopArk" };
  return { title: `${post.title} | TopArk News`, description: post.excerpt };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedNewsPostBySlug(slug);

  if (!post) notFound();

  const supabase = await createClient();
  await supabase.rpc("increment_news_post_views", { post_slug: slug });
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          TOPARK
        </Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/news" className={styles.navBack}>
            ← News
          </Link>
          {isLoggedIn && (
            <Link href="/dashboard" className={styles.navBack}>
              Dashboard →
            </Link>
          )}
        </div>
      </nav>
      <div className={styles.article}>
        <div className={styles.articleTag}>{post.tag}</div>
        <h1 className={styles.articleTitle}>{post.title}</h1>
        <div className={styles.articleMeta}>{formatNewsMeta(post)}</div>
        <div className={styles.articleBody}>{post.body}</div>
      </div>
    </>
  );
}
