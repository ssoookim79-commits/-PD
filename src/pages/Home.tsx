import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Skills from "../components/Skills";
import Trust from "../components/Trust";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Portfolio limit={2} />
      <Skills />
      <Trust />
      <Contact />
    </>
  );
}
