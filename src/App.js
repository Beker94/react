import "./App.css";

import React from "react";
import { FunctionalComponent } from "./components/FunctionalComponent";
import { Pure } from "./components/PureComponent";
import { ClassComponent } from "./components/ClassComponent";

function App() {
  const element = React.createElement(
    "h1",
    { className: "CreateElemen" },
    "Hello World(CreateElemen)"
  );
  return (
    <div>
      {element}
      <ClassComponent />
      <Pure />
      <FunctionalComponent />
    </div>
  );
}

export default App;
