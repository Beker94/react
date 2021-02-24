import React from "react";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

const App: React.FC = () => {
  const [searchFilm, setSearchFilm] = useState<string>("");

  const onSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchFilm(() => (e.target[0] as HTMLInputElement).value);
  };
  return (
    <>
      <Header onSearch={onSearch} />
      <Main searchFilm={searchFilm} />
      <Footer />
    </>
  );
};

export default App;
