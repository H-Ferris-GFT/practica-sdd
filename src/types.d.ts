declare module '*.css';

interface Movie {
        Title: string,
        Year: string,
        imdbID: string,
        Type: string,
        Poster: string
}

interface MovieResponse {
    Search?: Movie[],
    totalResults?: number,
    Response: 'True' | 'False',
    Error?: string
}