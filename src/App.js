import "./App.css";
import { createElement } from "react";
import FunctionalComponent from "./components/FunctionalComponent/FunctionalComponent";
import Pure from "./components/PureComponent/PureComponent";
import ClassComponent from "./components/Component/Component";

function App() {
  const element = createElement(
    "h1",
    { className: "CreateElemen" },
    "Hello World(CreateElemen)"
  );
  return (
    <div className="App">
      {element}
      <ClassComponent></ClassComponent>
      <Pure></Pure>
      <FunctionalComponent></FunctionalComponent>
    </div>
  );
}

export default App;
