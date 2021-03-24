import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sorting } from "../../helpers";
import { Film } from "../../interfaces";

import {
  clearfilmsList,
  fetchfilmsList,
} from "../../redux/filmList/actions/filmList.actions";

import { FilmCard } from "../FilmCard";

import "./style.scss";

const FilmList: React.FC = () => {
  const dispatch = useDispatch();

  const petProfile: Film[] = useSelector((state: any) => {
    return state.films.films;
  });
  const sortBy: string = useSelector((state: any) => {
    return state.films.sortByDate;
  });

  useEffect(() => {
    dispatch(fetchfilmsList.request());
    return () => {
      dispatch(clearfilmsList);
    };
  }, [dispatch]);

  return (
    <>
      <div className="film-count">
        <h3>
          <span>{petProfile.length}</span> films found
        </h3>
      </div>
      <div className={petProfile.length ? "film-list" : "film-list__none"}>
        {petProfile.length ? (
          sorting(petProfile, sortBy).map((el: any) => {
            return <FilmCard film={el} key={el.id} />;
          })
        ) : (
          <div>No movie found</div>
        )}
      </div>
    </>
  );
};

export default FilmList;
