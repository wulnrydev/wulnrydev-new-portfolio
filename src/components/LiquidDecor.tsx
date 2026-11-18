import styles from "./LiquidDecor.module.css";

/**
 * Decorative art layer for the hero: the holographic star and the
 * liquid-metal loop. Real rendered assets, transparent PNG/WebP.
 */
export default function LiquidDecor({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`${styles.layer} ${className}`} aria-hidden="true">
      <span className={`${styles.shape} ${styles.shapeTwo}`} />
      <span className={`${styles.shape} ${styles.shapeThree}`} />
    </div>
  );
}
