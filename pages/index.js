import { END } from "@redux-saga/core";
import { Header } from "../components/Header";
import { Main } from "../components/Main";

import { fetchfilmsList } from "../redux/filmList/actions/filmList.actions";
import { wrapper } from "../redux/rootStore";

function Home({ ssrFilms }) {
  return (
    <>
      <Header></Header>
      <Main ssrFilms={ssrFilms} />
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(
    fetchfilmsList.request({
      payloadOptions: {},
    })
  );

  store.dispatch(END);

  await store.sagaTask.toPromise();

  return {
    props: { ssrFilms: store.getState().films.films || [] },
  };
});

export default Home;
