import { dateFormatter } from "./helpers";

const films = [
  {
    title: "Wind",
    releaseDate: dateFormatter("2006"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Horror", label: "Horror" },
      {
        value: "Documentary",
        label: "Documentary",
      },
    ],
    movieURL:
      "https://upload.wikimedia.org/wikipedia/ru/5/56/Tenet_%28poster%29.jpg",
    overviev: "overviev",
    runtime: "300",
    rating: "4.4",
  },
  {
    title: "Dono",
    releaseDate: dateFormatter("2004"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Documentary", label: "Documentary" },
      { value: "Comedy", label: "Comedy" },
    ],
    movieURL: "https://static.hdrezka.ac/i/2016/5/26/g9742ec543f53yi47i55t.jpg",
    overviev: "overviev",
    runtime: "300",
    rating: "6.4",
  },
  {
    title: "Bono",
    releaseDate: dateFormatter("2003"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Comedy", label: "Comedy" },
      { value: "Horror", label: "Horror" },
    ],
    movieURL:
      "https://static.hdrezka.ac/i/2014/12/19/d633520dbca39yj82e20a.jpg",
    overviev: "overviev",
    runtime: "300",
    rating: "7.4",
  },
  {
    title: "Click",
    releaseDate: dateFormatter("2008"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Comedy", label: "Comedy" },
      { value: "Crime", label: "Crime" },
    ],
    movieURL: "https://static.hdrezka.ac/i/2016/5/1/za4647f6ddfe4zq39v46t.jpg",
    overviev: "overviev",
    runtime: "300",
    rating: "5.4",
  },
  {
    title: "Avatar",
    releaseDate: dateFormatter("2001"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Horror", label: "Horror" },
      { value: "Crime", label: "Crime" },
    ],
    movieURL: "https://static.hdrezka.ac/i/2013/12/3/o2cf4888d925efm10v54x.jpg",
    overviev: "overviev",
    runtime: "300",
    rating: "8.4",
  },
];

const genreList = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Documentary",
    label: "Documentary",
  },
  {
    value: "Comedy",
    label: "Comedy",
  },
  {
    value: "Horror",
    label: "Horror",
  },
  {
    value: "Crime",
    label: "Crime",
  },
];

export { genreList, films };
