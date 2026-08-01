import Image from "next/image";
import Link from "next/link";
import styles from "./landing.module.css";

const links = [
  { href: "#mission", label: "About" },
  { href: "#founders", label: "Founders" },
  { href: "#how", label: "How It Works" },
  { href: "#membership", label: "Membership" },
  { href: "#news", label: "News" },
  { href: "#testimonials", label: "Stories" },
  { href: "#interviews", label: "Interviews" },
];

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.navLogoLink}>
        <Image
          src="/logo.jpg"
          alt="TopArk"
          width={56}
          height={56}
          className={styles.navLogoImg}
          priority
        />
      </Link>
      <ul className={styles.navLinks}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <Link href="/signup">
        <button className={styles.navCta}>Join TopArk</button>
      </Link>
    </nav>
  );
}
