import { END } from "@redux-saga/core";
import { side } from "../../helpers";
import { fetchfilmsList } from "../../redux/filmList/actions/filmList.actions";
import { SagaStore } from "../../redux/rootStore";

import Home from "../index";

Home.getInitialProps = async ({ store, query }) => {
  if (side.isServer) {
    store.dispatch(
      fetchfilmsList.request({
        payloadOptions: { searchTitle: query.search },
      })
    );

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();
    return { isFirstRender: true };
  }
  return { isFirstRender: false };
};

export default Home;
