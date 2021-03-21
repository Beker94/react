  interface Genre {
    label: string;
    value: string; 
  };

  interface Film {
    title: string;
    releaseDate: string;
    genre: Array<Genre>;
    id: string;
    movieURL: string;
    overviev: string;
    runtime: string;
    rating: string
  };

  interface Modal {
    type: string;
    isOpen: boolean;
    film: Film | null;
  }

  
  

  export type {Film,Genre,Modal}
