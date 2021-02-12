import "./App.css";
import { createElement } from "react";
import { FunctionalComponent } from "./components/FunctionalComponent";
import { Pure } from "./components/PureComponent";
import { ClassComponent } from "./components/ClassComponent";

function App() {
  const element = createElement(
    "h1",
    { className: "CreateElemen" },
    "Hello World(CreateElemen)"
  );
  return (
    <div className="App">
      {element}
      <ClassComponent />
      <Pure />
      <FunctionalComponent />
    </div>
  );
}

export default App;
