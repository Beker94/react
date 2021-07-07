import { END } from "@redux-saga/core";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { side } from "../helpers";

import { fetchfilmsList } from "../redux/filmList/actions/filmList.actions";

function Home() {
  return (
    <>
      <Header></Header>
    </>
  );
}

Home.getInitialProps = async ({ store, query }) => {
  if (side.isServer) {
    store.dispatch(
      fetchfilmsList.request({
        payloadOptions: {},
      })
    );

    store.dispatch(END);

    await store.sagaTask.toPromise();

    return { isFirstRender: true };
  }

  return { isFirstRender: false };
};

export default Home;
