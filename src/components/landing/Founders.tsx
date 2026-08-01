import styles from "./landing.module.css";

const founders = [
  {
    initials: "NW",
    name: "NOAH WHITTLE",
    role: "Founder & CEO",
    bio: "Former professional running back with 6 years of international experience. Played across Germany, Poland, and Mexico — then built TopArk to give every athlete the same shot he had to find.",
    tags: [
      "🇩🇪 Solingen Paladins",
      "🇩🇪 Nürnberg Rams",
      "🇵🇱 Husaria Szczecin",
      "🇲🇽 Tequileros de Jalisco",
      "🇲🇽 Jefes de Ciudad Juárez",
      "🇲🇽 Mexicas de Mexico City",
    ],
  },
  {
    initials: "KB",
    name: "KENNETH BRADLEY",
    role: "Director of Strategy",
    bio: "7 years as a pro across 4 countries. LFA all-time leading tackler, single-season tackle record holder, 2024 LFA Champion, and two-time All-Pro. Ithaca College's all-time leading tackler.",
    tags: [
      "🇩🇪 Nürnberg Rams",
      "🇩🇰 Triangle Razorbacks",
      "🇫🇮 Porvoon Butchers",
      "🇲🇽 Tequileros de Jalisco",
      "🇲🇽 Jefes · Caudillos (LFA)",
    ],
  },
  {
    initials: "RH",
    name: "RONNIE HICKS",
    role: "Executive Director of Recruiting",
    bio: "Versatile DB/WR out of Cal Poly Humboldt who played professionally across 5 countries. Brings elite international recruiting experience and player development vision to TopArk.",
    tags: [
      "🇫🇷 Grenoble Centaures",
      "🇩🇪 Stuttgart Scorpions",
      "🇩🇪 Hildesheim Invaders",
      "🇩🇪 Nürnberg Rams",
      "🇭🇺 Fehérvár Enthroners",
      "🇲🇽 Tijuana Galgos",
    ],
  },
  {
    initials: "ET",
    name: "ELDRIDGE THOMPSON",
    role: "Scout & Events Executive Coordinator",
    bio: "SEC linebacker out of South Carolina who led Coffeyville CC in tackles before going pro in Mexico. Leads TopArk's combine operations and scouts underdog talent at schools nationwide.",
    tags: [
      "🏈 South Carolina (SEC)",
      "🏈 Coffeyville CC",
      "🇲🇽 Tequileros de Jalisco",
      "🇲🇽 Jefes de Ciudad Juárez",
    ],
  },
];

export default function Founders() {
  return (
    <section className={`${styles.section} ${styles.founders}`} id="founders">
      <div className={styles.foundersInner}>
        <div className={styles.sectionEyebrow}>The Team Behind TopArk</div>
        <h2 className={styles.foundersHeadline}>
          BUILT BY <span className={styles.accent}>PLAYERS.</span>
        </h2>
        <p className={styles.foundersSub}>
          TopArk wasn&apos;t built in a boardroom. It was built by athletes who played
          the game internationally, lived the grind, and came back to create the
          platform they wished they had.
        </p>
        <div className={styles.foundersGrid}>
          {founders.map((founder) => (
            <div className={styles.founderCard} key={founder.initials}>
              <div className={styles.founderAvatar}>{founder.initials}</div>
              <div className={styles.founderName}>{founder.name}</div>
              <div className={styles.founderRole}>{founder.role}</div>
              <p className={styles.founderBio}>{founder.bio}</p>
              <div className={styles.founderTags}>
                {founder.tags.map((tag) => (
                  <span className={styles.founderTag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
