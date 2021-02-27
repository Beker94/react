import React from "react";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

const App: React.FC = () => {
  const [searchedFilm, setSearchFilm] = useState("");

  const onSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchFilm(() => (event.target[0] as HTMLInputElement).value);
  };
  return (
    <>
      <Header onSearch={onSearch} />
      <Main searchedFilm={searchedFilm} />
      <Footer />
    </>
  );
};

export default App;
