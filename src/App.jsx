import { useState } from "react";
import "./App.css";

import AboutProjects from "./pages/About/AboutProjects";
import AboutWorkExperience from "./pages/About/AboutWorkExperience";
import Education from "./pages/Education/Education";
import Myself from "./pages/Myself/Myself";
import Skills from "./pages/Skills/Skills";
import Preloader from "./components/Preloader";

function App() {
  // Flips to true as the preloader's blinds start opening,
  // which is the cue for the hero's intro animation to play.
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />

      <Myself ready={ready} />
      <AboutWorkExperience />
      <AboutProjects />
      <Education />
      <Skills />
    </>
  );
}

export default App;