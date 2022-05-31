import { useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import Button from "../Button";
import {
  changeTime,
  startStopTimer,
  resetTimer,
  skip,
} from "../../utils/utils";

const Timer = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(
    new Date(new Date().getTime() + 25 * 60000)
  );
  const [stopTimer, setStopTimer] = useState(true);
  const [customTime, setCustomTime] = useState(false);
  const [displayMinutes, setDisplayMinutes] = useState("25");
  const [displaySeconds, setDisplaySeconds] = useState("00");
  const [mode, setMode] = useState("work");

  const { minutes, seconds, timeRemaining } = useTimer({
    startTime,
    setStartTime,
    finishTime,
    setFinishTime,
    stopTimer,
    setStopTimer,
    mode,
    setMode,
  });

  return (
    <div
      style={{
        margin: "10px auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Time to {mode}</p>
      <h1
        style={{ fontSize: "3em", margin: "0px auto 10px auto" }}
      >{`${minutes} : ${seconds}`}</h1>
      <div>
        <input
          id="minutes"
          type="number"
          max="59"
          min="0"
          value={displayMinutes}
          onChange={(e) =>
            changeTime({
              time: e.target.value,
              type: "minutes",
              setCustomTime,
              setDisplayMinutes,
              setStartTime,
              setFinishTime,
              displaySeconds,
            })
          }
          disabled={!stopTimer}
        ></input>
        <input
          id="seconds"
          type="number"
          maxLength={2}
          max={59}
          min={0}
          value={displaySeconds}
          onChange={(e) =>
            changeTime({
              time: e.target.value,
              type: "seconds",
              setCustomTime,
              setDisplaySeconds,
              setStartTime,
              setFinishTime,
              displayMinutes,
            })
          }
          disabled={!stopTimer}
        ></input>
      </div>

      <div>
        <Button
          onClick={() =>
            startStopTimer(
              timeRemaining,
              stopTimer,
              setStopTimer,
              setCustomTime,
              setStartTime,
              setFinishTime,
              displayMinutes,
              displaySeconds,
              customTime
            )
          }
        >
          {stopTimer ? "Start" : "Stop"}
        </Button>{" "}
        <Button
          onClick={() =>
            resetTimer(
              setStopTimer,
              setCustomTime,
              setStartTime,
              setFinishTime,
              displayMinutes,
              displaySeconds
            )
          }
        >
          Restart Timer
        </Button>{" "}
        <Button
          onClick={() =>
            skip(
              setStopTimer,
              setCustomTime,
              mode,
              setMode,
              setStartTime,
              setFinishTime,
              setDisplayMinutes,
              setDisplaySeconds
            )
          }
        >
          Skip
        </Button>{" "}
      </div>
    </div>
  );
};

export default Timer;
