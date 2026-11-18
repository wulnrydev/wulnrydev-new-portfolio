import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import AmbientField from "@/components/AmbientField";
import PastProjects from "@/components/PastProjects";
import Skills from "@/components/Skills";
import DecoImage from "@/components/DecoImage";
import styles from "./page.module.css";
import GitHub from "@/components/GitHub";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MusicPlayer />
        <AmbientField />
        <PastProjects />
        <div className={styles.skillsArea}>
          <Skills />
          <DecoImage src="/star.webp" className={styles.skillStar} />
          <DecoImage src="/infinity.webp" className={styles.skillInfinity} />
        </div>
        <GitHub />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
