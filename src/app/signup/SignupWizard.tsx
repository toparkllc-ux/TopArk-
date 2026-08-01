"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./signup.module.css";
import TermsAndConditions from "@/components/signup/TermsAndConditions";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

type AccountType = "athlete" | "team" | "";

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

type Checks = { tc: boolean; privacy: boolean; verify: boolean; media: boolean };

export default function SignupWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>("");
  const [errType, setErrType] = useState(false);
  const [errTc, setErrTc] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [athlete, setAthlete] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    position: "",
    country: "",
  });
  const [team, setTeam] = useState({
    teamName: "",
    contactName: "",
    country: "",
    email: "",
    password: "",
    league: "",
  });

  const [checks, setChecks] = useState<Checks>({
    tc: false,
    privacy: false,
    verify: false,
    media: false,
  });
  const [tcRead, setTcRead] = useState(false);
  const tcBodyRef = useRef<HTMLDivElement>(null);

  function handleTcScroll() {
    const el = tcBodyRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      setTcRead(true);
    }
  }

  function goStep(n: number) {
    if (n === 2 && !accountType) {
      setErrType(true);
      return;
    }
    if (n === 4) {
      const required: (keyof Checks)[] = ["tc", "privacy", "verify"];
      if (accountType === "team") required.push("media");
      if (!required.every((key) => checks[key])) {
        setErrTc(true);
        return;
      }
      handleCreateAccount();
      return;
    }
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleCheck(key: keyof Checks) {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
    setErrTc(false);
  }

  const requiredChecks: (keyof Checks)[] =
    accountType === "team" ? ["tc", "privacy", "verify", "media"] : ["tc", "privacy", "verify"];
  const allChecked = requiredChecks.every((key) => checks[key]);

  async function handleCreateAccount() {
    setSubmitting(true);
    setSubmitError("");

    const email = accountType === "athlete" ? athlete.email : team.email;
    const password = accountType === "athlete" ? athlete.password : team.password;

    if (!supabaseConfigured) {
      setStep(4);
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data:
          accountType === "athlete"
            ? {
                account_type: "athlete",
                first_name: athlete.firstName,
                last_name: athlete.lastName,
                position: athlete.position,
                country: athlete.country,
              }
            : {
                account_type: "team",
                team_name: team.teamName,
                contact_name: team.contactName,
                country: team.country,
                league: team.league,
              },
      },
    });

    setSubmitting(false);
    if (error) {
      setSubmitError(error.message);
      return;
    }
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const successIcon = accountType === "team" ? "🏟️" : "🏈";
  const successTitle = accountType === "team" ? "TEAM ACCOUNT CREATED" : "WELCOME TO TOPARK";
  const successBody =
    accountType === "team"
      ? "Your team account has been created. Set up your team profile and start browsing verified athletes on the TopArk platform."
      : "Your account has been created. Complete your verification to unlock full platform access and start connecting with teams worldwide.";
  const successCta = accountType === "team" ? "Go to Team Dashboard" : "Go to My Dashboard";
  const successHref = accountType === "team" ? "/team-dashboard" : "/dashboard";

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          Top<span>Ark</span>
        </Link>
        <Link href="/" className={styles.navBack}>
          ← Back to TopArk
        </Link>
      </nav>

      <div className={styles.signupWrap}>
        <div className={styles.signupContainer}>
          <div className={styles.signupHeader}>
            <div className={styles.signupEyebrow}>Join TopArk</div>
            <h1 className={styles.signupHeadline}>
              CREATE YOUR <span className={styles.accent}>ACCOUNT.</span>
            </h1>
            <p className={styles.signupSub}>
              Whether you&apos;re an athlete chasing your next contract or a team building your
              roster — it starts here.
            </p>
          </div>

          <div className={styles.stepIndicator}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`${styles.stepDot} ${i === step ? styles.stepDotActive : ""} ${
                  i < step ? styles.stepDotDone : ""
                }`}
              />
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div className={styles.stepTitle}>
                STEP 1 — <span className={styles.accent}>I AM A...</span>
              </div>
              <div className={styles.typeCards}>
                <div
                  className={`${styles.typeCard} ${accountType === "athlete" ? styles.typeCardSelected : ""}`}
                  onClick={() => {
                    setAccountType("athlete");
                    setErrType(false);
                  }}
                >
                  <div className={styles.typeIcon}>🏈</div>
                  <div className={styles.typeTitle}>ATHLETE</div>
                  <div className={styles.typeDesc}>
                    I&apos;m a football player looking for professional opportunities
                    internationally.
                  </div>
                </div>
                <div
                  className={`${styles.typeCard} ${accountType === "team" ? styles.typeCardSelected : ""}`}
                  onClick={() => {
                    setAccountType("team");
                    setErrType(false);
                  }}
                >
                  <div className={styles.typeIcon}>🏟️</div>
                  <div className={styles.typeTitle}>TEAM / COACH</div>
                  <div className={styles.typeDesc}>
                    I represent a team or organization looking to recruit American football
                    talent.
                  </div>
                </div>
              </div>
              {errType && (
                <div className={styles.errorMsg}>Please select an account type to continue.</div>
              )}
              <div className={styles.btnRow} style={{ marginTop: 24 }}>
                <button className={styles.btnPrimary} onClick={() => goStep(2)}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div className={styles.stepTitle}>
                STEP 2 — <span className={styles.accent}>YOUR INFO</span>
              </div>

              {accountType === "athlete" ? (
                <div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>First Name</label>
                      <input
                        className={styles.formInput}
                        placeholder="Noah"
                        value={athlete.firstName}
                        onChange={(e) => setAthlete({ ...athlete, firstName: e.target.value })}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Last Name</label>
                      <input
                        className={styles.formInput}
                        placeholder="Whittle"
                        value={athlete.lastName}
                        onChange={(e) => setAthlete({ ...athlete, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <input
                      className={styles.formInput}
                      type="email"
                      placeholder="you@example.com"
                      value={athlete.email}
                      onChange={(e) => setAthlete({ ...athlete, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Password</label>
                    <input
                      className={styles.formInput}
                      type="password"
                      placeholder="Min 8 characters"
                      value={athlete.password}
                      onChange={(e) => setAthlete({ ...athlete, password: e.target.value })}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Position</label>
                      <select
                        className={styles.formSelect}
                        value={athlete.position}
                        onChange={(e) => setAthlete({ ...athlete, position: e.target.value })}
                      >
                        <option value="">Select position</option>
                        {positions.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Country of Residence</label>
                      <input
                        className={styles.formInput}
                        placeholder="United States"
                        value={athlete.country}
                        onChange={(e) => setAthlete({ ...athlete, country: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Team / Organization Name</label>
                    <input
                      className={styles.formInput}
                      placeholder="Berlin Thunder FC"
                      value={team.teamName}
                      onChange={(e) => setTeam({ ...team, teamName: e.target.value })}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Coach / Contact Name</label>
                      <input
                        className={styles.formInput}
                        placeholder="Coach Schmidt"
                        value={team.contactName}
                        onChange={(e) => setTeam({ ...team, contactName: e.target.value })}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Country</label>
                      <input
                        className={styles.formInput}
                        placeholder="Germany"
                        value={team.country}
                        onChange={(e) => setTeam({ ...team, country: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Contact Email</label>
                    <input
                      className={styles.formInput}
                      type="email"
                      placeholder="coach@team.com"
                      value={team.email}
                      onChange={(e) => setTeam({ ...team, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Password</label>
                    <input
                      className={styles.formInput}
                      type="password"
                      placeholder="Min 8 characters"
                      value={team.password}
                      onChange={(e) => setTeam({ ...team, password: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>League / Division</label>
                    <input
                      className={styles.formInput}
                      placeholder="GFL, LFA, etc."
                      value={team.league}
                      onChange={(e) => setTeam({ ...team, league: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className={styles.btnRow}>
                <button className={styles.btnSecondary} onClick={() => goStep(1)}>
                  Back
                </button>
                <button className={styles.btnPrimary} onClick={() => goStep(3)}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <div className={styles.stepTitle}>
                STEP 3 — <span className={styles.accent}>TERMS &amp; CONDITIONS</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 20, lineHeight: 1.6 }}>
                Please review and accept the TopArk Terms &amp; Conditions before creating your
                account. Scroll to read the full agreement.
              </p>

              <div className={styles.tcContainer}>
                <div className={styles.tcHeader}>
                  <div className={styles.tcTitle}>TOPARK TERMS &amp; CONDITIONS</div>
                  <div className={styles.tcUpdated}>Last Updated: June 2026</div>
                </div>
                <div className={styles.tcBody} ref={tcBodyRef} onScroll={handleTcScroll}>
                  <TermsAndConditions />
                </div>
                <div
                  className={`${styles.tcScrollNotice} ${tcRead ? styles.tcScrollNoticeDone : ""}`}
                >
                  {tcRead ? "✓ You have read the full agreement" : "↓ Scroll to read the full agreement"}
                </div>
              </div>

              <div className={styles.checkboxGroup} onClick={() => toggleCheck("tc")}>
                <div className={`${styles.checkboxBox} ${checks.tc ? styles.checkboxBoxChecked : ""}`}>
                  {checks.tc ? "✓" : ""}
                </div>
                <div className={styles.checkboxLabel}>
                  I have read and agree to the <strong>TopArk Terms &amp; Conditions</strong>{" "}
                  outlined above.
                </div>
              </div>

              <div className={styles.checkboxGroup} onClick={() => toggleCheck("privacy")}>
                <div
                  className={`${styles.checkboxBox} ${checks.privacy ? styles.checkboxBoxChecked : ""}`}
                >
                  {checks.privacy ? "✓" : ""}
                </div>
                <div className={styles.checkboxLabel}>
                  I consent to TopArk collecting and processing my data as described in the{" "}
                  <strong>Privacy Policy</strong>, and understand my profile information will be
                  visible to registered teams and coaches.
                </div>
              </div>

              <div className={styles.checkboxGroup} onClick={() => toggleCheck("verify")}>
                <div
                  className={`${styles.checkboxBox} ${checks.verify ? styles.checkboxBoxChecked : ""}`}
                >
                  {checks.verify ? "✓" : ""}
                </div>
                <div className={styles.checkboxLabel}>
                  I understand that <strong>all athletes must complete verification</strong>{" "}
                  before messaging teams, and that{" "}
                  <strong>teams must collaborate on media and marketing</strong> for athletes
                  signed through TopArk.
                </div>
              </div>

              {accountType === "team" && (
                <div className={styles.checkboxGroup} onClick={() => toggleCheck("media")}>
                  <div
                    className={`${styles.checkboxBox} ${checks.media ? styles.checkboxBoxChecked : ""}`}
                  >
                    {checks.media ? "✓" : ""}
                  </div>
                  <div className={styles.checkboxLabel}>
                    As a Team / Coach, I agree to <strong>publicly acknowledge TopArk</strong>{" "}
                    and collaborate on shared media content when signing athletes discovered
                    through the Platform, as outlined in Section 6.
                  </div>
                </div>
              )}

              {errTc && (
                <div className={styles.errorMsg}>
                  You must agree to all terms before creating your account.
                </div>
              )}
              {submitError && <div className={styles.errorMsg}>{submitError}</div>}

              <div className={styles.btnRow}>
                <button className={styles.btnSecondary} onClick={() => goStep(2)}>
                  Back
                </button>
                <button
                  className={styles.btnPrimary}
                  disabled={!allChecked || submitting}
                  onClick={() => goStep(4)}
                >
                  {submitting ? "Creating Account…" : "Create My Account"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className={styles.successWrap}>
              <div className={styles.successIcon}>{successIcon}</div>
              <div className={styles.successTitle}>{successTitle}</div>
              <div className={styles.successBody}>{successBody}</div>
              <button
                className={styles.btnPrimary}
                style={{ maxWidth: 320, margin: "0 auto" }}
                onClick={() => router.push(successHref)}
              >
                {successCta}
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        © 2026 TopArk. All rights reserved. ·{" "}
        <a href="#" style={{ color: "var(--gray)", textDecoration: "none" }}>
          Terms &amp; Conditions
        </a>{" "}
        ·{" "}
        <a href="#" style={{ color: "var(--gray)", textDecoration: "none" }}>
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}
