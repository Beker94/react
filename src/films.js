import moment from "moment";

export const films = [
  {
    title: "Wind",
    releaseDate: moment(new Date("2006")).format("yyyy-MM-DD"),
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
    releaseDate: moment(new Date("2004")).format("yyyy-MM-DD"),
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
    releaseDate: moment(new Date("2003")).format("yyyy-MM-DD"),
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
    releaseDate: moment(new Date("2008")).format("yyyy-MM-DD"),
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
    releaseDate: moment(new Date("2001")).format("yyyy-MM-DD"),
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

export const genreList = [
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
