import Link from 'next/link';
import styles from './not-found.module.css';
import ThreeScene from '@/components/ThreeScene';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <ThreeScene />
      <div className={styles.content}>
        <h1 className={styles.glitch} data-text="404">404</h1>
        <p className={styles.text}>The page you are looking for has drifted into the void.</p>
        <Link href="/" className={styles.btn}>
          Return to Base
        </Link>
      </div>
    </div>
  );
}
