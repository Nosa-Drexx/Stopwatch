import Stopwatch from "./components/Stopwatch";
import Time from "./components/Time";
import DarkLightModeSelector from "./components/Modes";
// import { AnimatePresence, motion } from "framer-motion";

function App() {
  // const backgroundLogos = useRef();

  return (
    <div className="App">
      <DarkLightModeSelector />
      <div className="background-logos"></div>
      <div className="time-container">
        <Time />
      </div>
      <div className="stopwatch-container">
        <Stopwatch />
      </div>
    </div>
  );
}

export default App;
