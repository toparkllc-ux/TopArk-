"use client";

import { useState, FormEvent } from "react";
import styles from "./landing.module.css";

const positions = [
  "Quarterback",
  "Running Back",
  "Wide Receiver",
  "Tight End",
  "Offensive Lineman",
  "Defensive Lineman",
  "Linebacker",
  "Cornerback",
  "Safety",
  "Kicker / Punter",
];

const countries = ["Germany", "France", "Sweden", "Italy", "Spain", "Austria", "Mexico", "Open to any"];

export default function InterviewSection() {
  const [tab, setTab] = useState<"athlete" | "team">("athlete");
  const [athleteSent, setAthleteSent] = useState(false);
  const [teamSent, setTeamSent] = useState(false);

  function handleAthleteSubmit(e: FormEvent) {
    e.preventDefault();
    setAthleteSent(true);
  }

  function handleTeamSubmit(e: FormEvent) {
    e.preventDefault();
    setTeamSent(true);
  }

  return (
    <section className={`${styles.section} ${styles.interviewSection}`} id="interviews">
      <div className={styles.interviewInner}>
        <div className={styles.sectionEyebrow}>Schedule A Meeting</div>
        <h2 className={styles.interviewHeadline}>
          REQUEST AN <span className={styles.accent}>INTERVIEW.</span>
        </h2>
        <p className={styles.interviewSub}>
          Athletes can request interviews with teams. Teams can invite players for
          evaluation calls. Direct. Fast. No agency needed.
        </p>
        <div className={styles.interviewTabs}>
          <button
            className={`${styles.itab} ${tab === "athlete" ? styles.itabActive : ""}`}
            onClick={() => setTab("athlete")}
          >
            I&apos;m an Athlete
          </button>
          <button
            className={`${styles.itab} ${tab === "team" ? styles.itabActive : ""}`}
            onClick={() => setTab("team")}
          >
            I&apos;m a Team / Coach
          </button>
        </div>

        <div
          className={`${styles.interviewPanel} ${tab === "athlete" ? styles.interviewPanelActive : ""}`}
        >
          <div className={styles.interviewForm}>
            <div className={styles.formTitle}>REQUEST A TEAM INTERVIEW</div>
            {!athleteSent ? (
              <form onSubmit={handleAthleteSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>First Name</label>
                    <input className={styles.formInput} type="text" placeholder="Marcus" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Last Name</label>
                    <input className={styles.formInput} type="text" placeholder="Johnson" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input className={styles.formInput} type="email" placeholder="marcus@example.com" required />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Position</label>
                    <select className={styles.formSelect} defaultValue="" required>
                      <option value="" disabled>Select position</option>
                      {positions.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Target Country</label>
                    <select className={styles.formSelect} defaultValue="" required>
                      <option value="" disabled>Select country</option>
                      {countries.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Preferred Interview Date</label>
                  <input className={styles.formInput} type="date" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tell the team about yourself</label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="Position, experience, goals, film link..."
                  />
                </div>
                <button className={`${styles.btnPrimary} ${styles.formSubmit}`} type="submit">
                  Send Interview Request
                </button>
              </form>
            ) : (
              <div className={styles.formSuccess}>
                <div className={styles.formSuccessIcon}>🏈</div>
                <div className={styles.formSuccessTitle}>REQUEST SENT</div>
                <div className={styles.formSuccessBody}>
                  Your interview request has been submitted. A TopArk coordinator will
                  confirm your slot within 24 hours.
                </div>
              </div>
            )}
          </div>
          <div className={styles.interviewInfo}>
            <div className={styles.iinfoCard}>
              <div className={styles.iinfoTitle}>WHAT TO EXPECT</div>
              <div className={styles.iinfoBody}>
                After submitting, a TopArk coordinator reviews your profile and matches
                you with teams that fit your position and target region. You&apos;ll get
                a confirmed time slot within 24 hours.
              </div>
            </div>
            <div className={styles.iinfoCard}>
              <div className={styles.iinfoTitle}>VIDEO OR CALL</div>
              <div className={styles.iinfoBody}>
                Interviews happen via video call so coaches can see you, ask questions,
                and evaluate your fit — just like a real professional tryout conversation.
              </div>
            </div>
            <div className={styles.iinfoCard}>
              <div className={styles.iinfoTitle}>MEMBERSHIP REQUIRED</div>
              <div className={styles.iinfoBody}>
                Interview requests are available to Elite and Pro Ark members. Upgrade
                your plan to unlock direct access to international teams and coaches.
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.interviewPanel} ${tab === "team" ? styles.interviewPanelActive : ""}`}
        >
          <div className={styles.interviewForm}>
            <div className={styles.formTitle}>INVITE A PLAYER FOR EVALUATION</div>
            {!teamSent ? (
              <form onSubmit={handleTeamSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Team / Organization Name</label>
                  <input className={styles.formInput} type="text" placeholder="Berlin Thunder FC" required />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Coach / Contact Name</label>
                    <input className={styles.formInput} type="text" placeholder="Coach Schmidt" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Country</label>
                    <select className={styles.formSelect} defaultValue="" required>
                      <option value="" disabled>Select country</option>
                      {[...countries.slice(0, -1), "Other"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Contact Email</label>
                  <input className={styles.formInput} type="email" placeholder="coach@team.com" required />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Position(s) Needed</label>
                    <select className={styles.formSelect} defaultValue="" required>
                      <option value="" disabled>Select position</option>
                      {[...positions.slice(0, -1), "Multiple positions"].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Preferred Interview Date</label>
                    <input className={styles.formInput} type="date" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Roster needs &amp; requirements</label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="Experience level, contract type, availability..."
                  />
                </div>
                <button className={`${styles.btnPrimary} ${styles.formSubmit}`} type="submit">
                  Submit Roster Request
                </button>
              </form>
            ) : (
              <div className={styles.formSuccess}>
                <div className={styles.formSuccessIcon}>🌍</div>
                <div className={styles.formSuccessTitle}>REQUEST RECEIVED</div>
                <div className={styles.formSuccessBody}>
                  We&apos;ll match your roster needs with verified TopArk athletes and
                  schedule your evaluation interviews within 48 hours.
                </div>
              </div>
            )}
          </div>
          <div className={styles.interviewInfo}>
            <div className={styles.iinfoCard}>
              <div className={styles.iinfoTitle}>PRE-SCREENED ATHLETES</div>
              <div className={styles.iinfoBody}>
                Every athlete on TopArk has a verified profile. You&apos;re evaluating
                real players with confirmed credentials.
              </div>
            </div>
            <div className={styles.iinfoCard}>
              <div className={styles.iinfoTitle}>FAST TURNAROUND</div>
              <div className={styles.iinfoBody}>
                Submit your request today and have your first athlete interviews
                scheduled within 48 hours.
              </div>
            </div>
            <div className={styles.iinfoCard}>
              <div className={styles.iinfoTitle}>PARTNER TEAM ACCESS</div>
              <div className={styles.iinfoBody}>
                Teams partner directly with TopArk to access our verified athlete
                database. Reach out to our team to discuss partnership terms and
                roster support.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
