import { render } from "react-dom";
import { useEffect } from "react";
import Timer from "./components/Timer/Timer";
import Login from "./components/Login";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { StateProvider, useStateProvider } from "./utils/StateProvider";
import reducer, { initialState } from "./utils/reducer";

const App = () => {
  const [{ access_token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const access_token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: "SET_ACCESS_TOKEN", payload: access_token });
    }
  }, [access_token, dispatch]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Pomodoro</h1>
      <Timer />
      {access_token ? <MusicPlayer /> : <Login />}
    </div>
  );
};

render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
