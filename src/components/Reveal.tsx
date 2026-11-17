"use client";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function Reveal({
  children,
  width = "fit-content",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const offset = reduceMotion
    ? {}
    : {
        up: { y: 24 },
        down: { y: -24 },
        left: { x: -24 },
        right: { x: 24 },
      }[direction];

  return (
    <motion.div
      className={styles.root}
      style={{ width }}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
