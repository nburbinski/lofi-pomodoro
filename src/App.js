import { render } from "react-dom";
import Timer from "./components/Timer";

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Timer />
    </div>
  );
};

render(<App />, document.getElementById("root"));
