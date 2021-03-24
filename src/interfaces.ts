  interface Film {
    title: string;
    tagline:	string;
    release_date: string;
    genres: Array<string>;
    id: number;
    poster_path: string;
    overview: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    budget: number;
    revenue: number;
  };



  interface Modal {
    type: string;
    isOpen: boolean;
    film: Film | null;
  }

  
  

  export type {Film,Modal}
