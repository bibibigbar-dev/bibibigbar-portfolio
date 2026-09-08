import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import BlobBackground from "@/components/BlobBackground";
import CursorFollower from "@/components/CursorFollower";

export default function Home() {
  return (
    <>
      <BlobBackground />
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
