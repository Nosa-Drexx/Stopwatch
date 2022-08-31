import { useState, useEffect } from "react";

function timerset(prev, stopwatch) {
  if (stopwatch.milliseconds === 100) {
    return { ...prev, milliseconds: 0, seconds: stopwatch.seconds + 1 };
  }
  if (stopwatch.seconds === 60) {
    return {
      ...prev,
      milliseconds: 0,
      seconds: 0,
      minutes: stopwatch.minutes + 1,
    };
  }
  if (stopwatch.minutes === 60) {
    return {
      ...prev,
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: stopwatch.hours + 1,
    };
  }
  if (stopwatch.hours === 12) {
    return {
      ...prev,
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  }
  return { ...prev, milliseconds: stopwatch.milliseconds + 1 };
}

const initialStopwatch = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
};

function Startbuttons({ buttons }) {
  const { start, laps, disabled } = buttons;
  return (
    <div>
      {" "}
      <button className="stopwatchButtons" onClick={start}>
        Start
      </button>
      <button
        className="stopwatchButtons lapbtn"
        onClick={laps}
        disabled={disabled}
      >
        Lap
      </button>
    </div>
  );
}
function Stopbuttons({ buttons }) {
  const { stop, laps, disabled } = buttons;
  return (
    <div>
      <button className="stopwatchButtons stopbtn" onClick={stop}>
        Stop
      </button>
      <button
        className="stopwatchButtons lapbtn"
        onClick={laps}
        disabled={disabled}
      >
        Lap
      </button>
    </div>
  );
}

function Resumebuttons({ buttons }) {
  const { resume, reset } = buttons;
  return (
    <div>
      <button className="stopwatchButtons" onClick={resume}>
        Resume
      </button>
      <button className="stopwatchButtons lapbtn" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

function formatTime(num) {
  if (num < 10) return `0${num}`;
  return num;
}

function Stopwatch() {
  const [stopwatch, setStopwatch] = useState(initialStopwatch);
  const [timerController, setTimerController] = useState("OFF");
  const [stop, setStop] = useState("FALSE");
  const [lap, setLap] = useState([]);
  const [disablelap, setDisableLap] = useState(true);
  const [lapStopWatch, setlapStopWatch] = useState(initialStopwatch);
  const [lapStop, setLapStop] = useState(true);
  const [substracedLap, setsubstractedLap] = useState([]);
  const [savetime, setSavetime] = useState({});

  useEffect(() => {
    let timer = "";
    if (timerController === "ON") {
      timer = setTimeout(() => {
        setStopwatch((prev) => {
          return timerset(prev, stopwatch);
        });
      }, 10);
    }

    return () => clearTimeout(timer);
  }, [timerController, stopwatch]);

  useEffect(() => {
    let laptimer = "";
    if (!lapStop) {
      laptimer = setTimeout(() => {
        setlapStopWatch((prev) => {
          return timerset(prev, lapStopWatch);
        });
      }, 10);
    }

    return () => clearTimeout(laptimer);
  }, [lapStop, lapStopWatch]);

  function startStopWatch() {
    setTimerController("ON");
    setDisableLap(!disablelap);
  }
  function stopStopWatch() {
    setTimerController("OFF");
    setStop("TRUE");
    setLapStop(true);
  }
  function resetStopWatch() {
    setTimerController("OFF");
    setStop("FALSE");
    setStopwatch(initialStopwatch);
    setLap([]);
    setDisableLap(true);
    setsubstractedLap([]);
  }
  function resumeStopWatch() {
    setTimerController("ON");
    setStop("FALSE");
    setLapStop(false);
  }

  const displayScreen = `${formatTime(stopwatch.hours)} : ${formatTime(
    stopwatch.minutes
  )} : ${formatTime(stopwatch.seconds)} . ${formatTime(
    stopwatch.milliseconds
  )}`;
  const save = {
    hours: formatTime(stopwatch.hours),
    minutes: formatTime(stopwatch.minutes),
    seconds: formatTime(stopwatch.seconds),
    milliseconds: formatTime(stopwatch.milliseconds),
  };

  const displayLap = `${formatTime(lapStopWatch.hours)} : ${formatTime(
    lapStopWatch.minutes
  )} : ${formatTime(lapStopWatch.seconds)} . ${formatTime(
    lapStopWatch.milliseconds
  )}`;

  function lapsFn() {
    setLap([displayScreen, ...lap]);
    setSavetime(save);
    setsubstractedLap(() => {
      if (lap.length >= 1) {
        // const value = (Number(display) - Number(lap[0])).toFixed(2);
        const initial = new Date(
          `2022-04-27T${save.hours}:${save.minutes}:${save.seconds}.${
            Number(save.milliseconds) * 10
          }`
        );
        const previouslap = new Date(
          `2022-04-27T${savetime.hours}:${savetime.minutes}:${
            savetime.seconds
          }.${Number(savetime.milliseconds) * 10}`
        );
        const answer = new Date(initial - previouslap);
        const prelaps = `${formatTime(answer.getHours() - 1)} : ${formatTime(
          answer.getMinutes()
        )} : ${formatTime(answer.getSeconds())} . ${formatTime(
          Number(answer.getMilliseconds()) / 10
        )}`;
        return [prelaps, ...substracedLap];
      }
      const prelaps = `${save.hours} : ${save.minutes} : ${save.seconds} . ${save.milliseconds}`;
      return [prelaps, ...substracedLap];
    });
    setLapStop(false);
    setlapStopWatch(initialStopwatch);
  }

  return (
    <div>
      <div className="stopwatchContainer">
        <div>
          <h1>{displayScreen} </h1>
        </div>
        <div className="minilap">
          <p>{lap.length ? <span>{displayLap}</span> : null}</p>
        </div>
      </div>

      <div className="lapContainer">
        {lap.length ? (
          <div className="lapGridContainer">
            <h3 className="left header">Lap </h3>
            <h3 className="middle header">Lap times</h3>
            <h3 className="right header">Overall time</h3>
            <div className="right time">
              {lap.map((elem, index) => {
                return <p key={index}>{elem}</p>;
              })}
            </div>
            <div className="middle time">
              {substracedLap.map((elem, index) => {
                return <p key={index}>{elem}</p>;
              })}
            </div>
            <div className="left time">
              {lap.map((elem, index) => {
                var counts = lap.length - index;
                if (counts < 10) {
                  counts = `0${counts}`;
                }
                return <p key={index}>{counts}</p>;
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div className="buttonHolder">
        {stopwatch === initialStopwatch ? (
          <Startbuttons
            buttons={{
              start: startStopWatch,
              laps: lapsFn,
              disabled: disablelap,
            }}
          />
        ) : stop === "TRUE" ? (
          <Resumebuttons
            buttons={{ resume: resumeStopWatch, reset: resetStopWatch }}
          />
        ) : (
          <Stopbuttons
            buttons={{
              stop: stopStopWatch,
              laps: lapsFn,
              disabled: disablelap,
            }}
          />
        )}
      </div>
    </div>
  );
}
export default Stopwatch;
