 export interface Genre {
    genre: string;
    id: string; 
  }

 export interface FilmObj {
    name: string;
    year: number;
    genre: Array<string>;
  }