import { wrapper } from "../redux/rootStore";
import "../styles/globals.css";
import { Footer } from "../components/Footer";
import { FormWrapper } from "../components/FormWrapper";
import { useSelector } from "react-redux";
import {
  isOpenSelector,
  modalTypeSelector,
  movieSelector,
  successSubmitSelector,
} from "../redux/selectors";
import { RootState } from "../redux/rootStore";
import { Film } from "../components/interfaces";

import "../app-styles.scss";
import "../components/DeleteForm/style.scss";
import "../components/ErrorField/style.scss";
import "../components/FilmCard/style.scss";
import "../components/FilmForm/style.scss";
import "../components/FilmFormWrapper/style.scss";
import "../components/FilmList/style.scss";
import "../components/FilterMoviesList/style.scss";
import "../components/Footer/style.scss";
import "../components/FormWrapper/style.scss";
import "../components/Main/style.scss";
import "../components/NotFoundPage/style.scss";
import "../components/SuccessPopap/style.scss";
import "../components/SearchFilm/style.scss";
import "../components/Header/style.scss";
import "./movie/style.scss";
import "../app-styles.scss";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const film = useSelector<RootState, Film>(movieSelector);
  const isOpen = useSelector<RootState, boolean>(isOpenSelector);
  const modalType = useSelector<RootState, string | null>(modalTypeSelector);
  const successSubmit = useSelector<RootState, boolean>(successSubmitSelector);
  const router = useRouter();
  const notFound = router.route === "/404";

  return (
    <>
      <Component {...pageProps} />
      {!notFound && (
        <>
          <Footer />
        </>
      )}

      {isOpen || successSubmit ? (
        <FormWrapper
          film={film}
          modalType={modalType}
          successSubmit={successSubmit}
          isOpen={isOpen}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
