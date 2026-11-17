import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import AmbientField from "@/components/AmbientField";
import PastProjects from "@/components/PastProjects";
import Skills from "@/components/Skills";
import GitHub from "@/components/GitHub";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MusicPlayer />
        <AmbientField />
        <PastProjects />
        <Skills />
        <GitHub />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
