  interface Genre {
    genre: string;
    id: string; 
  };

  interface Film {
    title: string;
    releaseDate: Date;
    genre: Array<object>;
    id: string;
    movieURL: string;
    overviev: string;
    runtime: string;
  };

  interface Modal {
    type: string;
    isOpen: boolean;
    filmID: string;
  }

  
  

  export type {Film,Genre,Modal}
