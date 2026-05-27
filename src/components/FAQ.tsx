"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import styles from "./FAQ.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How long does a server setup or plugin take to complete?",
    answer: "Timelines vary heavily based on complexity. A standard plugin might take a few days, while a full network setup with custom features can take 2 to 4 weeks. I always provide an estimated timeframe before starting."
  },
  {
    question: "Do you provide support after the project is delivered?",
    answer: "Yes, absolutely. I offer a standard 2-week bug-fixing period for all my projects after delivery to ensure everything runs smoothly in a live environment."
  },
  {
    question: "Can I request changes during the development process?",
    answer: "Minor tweaks are always welcome. However, significant changes to the agreed-upon scope may require a timeline adjustment or an additional fee. I keep communication open throughout the process."
  },
  {
    question: "Are your setups highly optimized for player counts?",
    answer: "Performance is my top priority. I configure paper/purpur forks, optimize garbage collection, and ensure all plugins use asynchronous tasks where possible to handle high player counts without lag."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First one open by default

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        
        <Reveal width="100%">
          <div className={styles.dividerRow}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>FAQ</span>
            <span className={styles.dividerLine} />
          </div>
        </Reveal>

        <div className={styles.header}>
          <Reveal delay={150} width="100%">
            <h2 className={styles.title}>Common Questions</h2>
          </Reveal>
          <Reveal delay={300} width="100%">
            <p className={styles.sub}>Everything you need to know about my services</p>
          </Reveal>
        </div>

        <div className={styles.list}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
                onClick={() => toggle(idx)}
              >
                <div className={styles.questionRow}>
                  <h3 className={styles.question}>{faq.question}</h3>
                  <div className={styles.iconBox}>
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
                  </div>
                </div>
                <div className={styles.answerWrapper} style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
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
