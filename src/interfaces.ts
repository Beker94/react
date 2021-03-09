  interface Genre {
    label: string;
    value: string; 
  };

  interface Film {
    title: string;
    releaseDate: Date;
    genre: Array<Genre>;
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
