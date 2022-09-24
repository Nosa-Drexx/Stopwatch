import { useState, useRef, useEffect } from "react";

const theme = document.documentElement;

function DarkLightModeSelector() {
  const [darkOrLight, setDarkOrLight] = useState(
    window.matchMedia("(prefers-color-scheme: dark").matches
  ); //return true | false
  const control = useRef();
  const [modeInput, setModeInput] = useState(darkOrLight);

  useEffect(() => {
    if (!darkOrLight) {
      theme.style.setProperty("--colorB", "white");
      theme.style.setProperty("--colorW", "black");
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    setModeInput(darkOrLight);
    if (modeInput) {
      control.current.style.left = "60%";
    } else if (!modeInput) {
      control.current.style.left = "5%";
    }
  }, [modeInput, darkOrLight]);

  function toggle() {
    // Light Mode
    if (darkOrLight) {
      theme.style.setProperty("--colorB", "white");
      theme.style.setProperty("--colorW", "black");
      setDarkOrLight(false);
    }
    // Dark Mode
    else {
      theme.style.setProperty("--colorB", "black");
      theme.style.setProperty("--colorW", "white");
      setDarkOrLight(true);
    }
  }

  function controlMode() {
    if (!darkOrLight) {
      setModeInput(true);
      toggle();
    } else if (darkOrLight) {
      setModeInput(false);
      toggle();
    }
  }

  return (
    <div className="main-container-relative">
      <input onChange={toggle} type="checkbox" checked={modeInput} />
      <div className="wrapper">
        <div className="design">
          <button ref={control} onClick={controlMode} className="togglebtn">
            {darkOrLight ? (
              <i className="fa-solid fa-sun day"></i>
            ) : (
              <i className="fa-solid fa-moon night"></i>
            )}
          </button>
          {darkOrLight ? "D" : "L"}
        </div>
      </div>
    </div>
  );
}

export default DarkLightModeSelector;
