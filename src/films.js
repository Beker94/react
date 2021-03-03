export const films = [
  {
    title: "Wind",
    releaseDate: new Date("2006"),
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
  },
  {
    title: "Dono",
    releaseDate: new Date("2004"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Documentary", label: "Documentary" },
      { value: "Comedy", label: "Comedy" },
    ],
    movieURL:
      "https://upload.wikimedia.org/wikipedia/ru/5/56/Tenet_%28poster%29.jpg",
    overviev: "overviev",
    runtime: "300",
  },
  {
    title: "Bono",
    releaseDate: new Date("2003"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Comedy", label: "Comedy" },
      { value: "Horror", label: "Horror" },
    ],
    movieURL:
      "https://upload.wikimedia.org/wikipedia/ru/5/56/Tenet_%28poster%29.jpg",
    overviev: "overviev",
    runtime: "300",
  },
  {
    title: "Click",
    releaseDate: new Date("2008"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Comedy", label: "Comedy" },
      { value: "Crime", label: "Crime" },
    ],
    movieURL:
      "https://upload.wikimedia.org/wikipedia/ru/5/56/Tenet_%28poster%29.jpg",
    overviev: "overviev",
    runtime: "300",
  },
  {
    title: "Avatar",
    releaseDate: new Date("2001"),
    id: `${Math.floor(Math.random() * 10000)}`,
    genre: [
      { value: "Horror", label: "Horror" },
      { value: "Crime", label: "Crime" },
    ],
    movieURL:
      "https://upload.wikimedia.org/wikipedia/ru/5/56/Tenet_%28poster%29.jpg",
    overviev: "overviev",
    runtime: "300",
  },
];

export const genreList = [
  {
    genre: "All",
    id: "All",
  },
  {
    genre: "Documentary",
    id: "Documentary",
  },
  {
    genre: "Comedy",
    id: "Comedy",
  },
  {
    genre: "Horror",
    id: "Horror",
  },
  {
    genre: "Crime",
    id: "Crime",
  },
];
