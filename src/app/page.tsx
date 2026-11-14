import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PastProjects from "@/components/PastProjects";
import Skills from "@/components/Skills";
import GitHub from "@/components/GitHub";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ThreeSceneFooter from "@/components/ThreeSceneFooter";
import ThreeSceneDNA from "@/components/ThreeSceneDNA";
import ThreeSceneMorphSphere from "@/components/ThreeSceneMorphSphere";
import ThreeSceneNebula from "@/components/ThreeSceneNebula";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* 3D DNA Helix transition between Hero and Past Projects */}
        <div style={{ position: "relative", width: "100%", height: "420px", marginTop: "-100px", marginBottom: "-100px", pointerEvents: "none" }}>
          <ThreeSceneDNA />
        </div>

        <PastProjects />

        {/* 3D Morphing Sphere transition between Past Projects and Skills */}
        <div style={{ position: "relative", width: "100%", height: "440px", marginTop: "-120px", marginBottom: "-120px", pointerEvents: "none" }}>
          <ThreeSceneMorphSphere />
        </div>

        <Skills />

        {/* 3D Nebula Galaxy transition between Skills and GitHub */}
        <div style={{ position: "relative", width: "100%", height: "420px", marginTop: "-100px", marginBottom: "-100px", pointerEvents: "none" }}>
          <ThreeSceneNebula />
        </div>

        <GitHub />
        <FAQ />

        {/* 3D Wave Ocean element at the bottom */}
        <div style={{ position: "relative", width: "100%", height: "500px", marginTop: "-150px", pointerEvents: "none" }}>
          <ThreeSceneFooter />
        </div>
      </main>
      <Footer />
    </>
  );
}
