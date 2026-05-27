import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurrentWork from "@/components/CurrentWork";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ThreeSceneFooter from "@/components/ThreeSceneFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CurrentWork />
        <Skills />
        <Portfolio />
        <FAQ />
        {/* Creative 3D element at the bottom */}
        <div style={{ position: "relative", width: "100%", height: "500px", marginTop: "-150px", pointerEvents: "none" }}>
          <ThreeSceneFooter />
        </div>
      </main>
      <Footer />
    </>
  );
}
