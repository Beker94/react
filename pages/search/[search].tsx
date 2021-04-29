import { END } from "@redux-saga/core";
import { fetchfilmsList } from "../../redux/filmList/actions/filmList.actions";
import { SagaStore, wrapper } from "../../redux/rootStore";

import Home from "../index";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query, store }) => {
    store.dispatch(
      fetchfilmsList.request({
        payloadOptions: { searchTitle: query.search },
      })
    );

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return {
      props: { ssrFilms: store.getState().films.films || [] },
    };
  }
);

export default Home;
