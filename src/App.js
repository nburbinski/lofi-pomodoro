import { render } from "react-dom";
import Button from "./components/Button";
import Timer from "./components/Timer";
import { useState } from "react";

const App = () => {
  const [stop, setStop] = useState(false);

  return (
    <div>
      <h1>Hello World</h1>
      <Timer stop={stop} />
      <Button onClick={() => setStop(!stop)}>{stop ? "stop" : "start"}</Button>
    </div>
  );
};

render(<App />, document.getElementById("root"));
