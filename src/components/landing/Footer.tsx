import Image from "next/image";
import Link from "next/link";
import styles from "./landing.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.footerLogoLink}>
        <Image
          src="/logo.jpg"
          alt="TopArk"
          width={48}
          height={48}
          className={styles.footerLogoImg}
        />
      </Link>
      <ul className={styles.footerLinks}>
        <li>
          <a href="#founders">Athletes</a>
        </li>
        <li>
          <a href="#membership">Teams</a>
        </li>
        <li>
          <a href="#membership">Membership</a>
        </li>
        <li>
          <a href="#news">News</a>
        </li>
        <li>
          <a href="#interviews">Contact</a>
        </li>
      </ul>
      <div className={styles.footerCopy}>© 2026 TopArk. All rights reserved.</div>
    </footer>
  );
}
