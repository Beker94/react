  interface Genre {
    genre: string;
    id: string; 
  };

  interface Film {
    name: string;
    year: number;
    genre: Array<string>;
    id: number;
    src: string;
  };

  export type {Film,Genre}
