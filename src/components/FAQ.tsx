"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import styles from "./FAQ.module.css";
import { useLang } from "@/context/LanguageContext";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { t } = useLang();
  const f = t.faq;

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>

        <Reveal width="100%">
          <div className={styles.dividerRow}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>{f.sectionLabel}</span>
            <span className={styles.dividerLine} />
          </div>
        </Reveal>

        <div className={styles.header}>
          <Reveal delay={150} width="100%">
            <h2 className={styles.title}>{f.title}</h2>
          </Reveal>
          <Reveal delay={300} width="100%">
            <p className={styles.sub}>{f.sub}</p>
          </Reveal>
        </div>

        <div className={styles.list}>
          {f.items.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
              >
                <h3 className={styles.questionHeading}>
                  <button
                    type="button"
                    id={`faq-question-${idx}`}
                    className={styles.questionButton}
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className={styles.question}>{faq.question}</span>
                    <span className={styles.iconBox} aria-hidden="true">
                      <svg
                        width="16" height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={styles.answerWrapper}
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
