import styles from "./landing.module.css";

const steps = [
  {
    num: "01",
    icon: "🏈",
    title: "BUILD YOUR PROFILE",
    body: "Create a verified athlete profile with your measurements, position, film, and career history. Stand out to teams worldwide.",
  },
  {
    num: "02",
    icon: "🌍",
    title: "GET DISCOVERED",
    body: "International teams and coaches browse our verified database to find players that fit your roster needs — in real time.",
  },
  {
    num: "03",
    icon: "⚡",
    title: "CONNECT INSTANTLY",
    body: "Message coaches directly. No email chains, no weeks of waiting. Real conversations that lead to real opportunities.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.how}>
        <div className={styles.sectionEyebrow} style={{ textAlign: "center" }}>
          The Process
        </div>
        <h2 className={styles.howHeadline}>
          HOW <span className={styles.accent}>TOPARK</span> WORKS
        </h2>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div className={styles.step} key={step.num}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepBody}>{step.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
