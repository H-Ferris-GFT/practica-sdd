import { FormEvent, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Imagen from './components/Imagen';

const API_KEY = '61558a45'; //generate your api key --> https://www.omdbapi.com/apikey.aspx
const BASE_URI = 'https://www.omdbapi.com/';
const DEFAULT_QUERY = 'Star Wars';

type SortOption = 'year' | 'title';

const sortMovies = (movies: Movie[], sortBy: SortOption) => {
  const sortedMovies = [...movies];

  return sortedMovies.sort((a, b) => {
    if (sortBy === 'year') {
      return Number(a.Year || 0) - Number(b.Year || 0);
    }

    const leftTitle = a.Title || '';
    const rightTitle = b.Title || '';

    return leftTitle.localeCompare(rightTitle, 'es', { sensitivity: 'base' });
  });
};

const App = () => {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('year');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const sortedMovies = useMemo(() => sortMovies(movies, sortBy), [movies, sortBy]);

  const handleSearch = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setMovies([]);
      setError('Debes ingresar una película');
      return;
    }

    if (normalizedQuery.length < 3) {
      setMovies([]);
      setError('La búsqueda debe tener al menos 3 letras');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URI}?apikey=${API_KEY}&s=${encodeURIComponent(normalizedQuery)}`);
      const results = (await response.json()) as MovieResponse;

      if (results.Response === 'False') {
        setMovies([]);
        setError(results.Error || 'No se encontraron resultados');
        return;
      }

      setMovies(results.Search || []);
    } catch (error) {
      setMovies([]);
      setError('Ha habido algún error al buscar películas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <h1>Buscador de películas</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <input
            className="search-input"
            type="text"
            value={query}
            placeholder="Buscar películas"
            aria-label="Buscar películas"
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button
              type="button"
              className="clear-input-button"
              aria-label="Vaciar búsqueda"
              onClick={() => setQuery('')}
            >
              ×
            </button>
          )}
        </div>
        <button className="search-button" type="submit" disabled={loading}>
          <img className="search-icon" src="/search.png" alt="" aria-hidden="true" />
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {movies.length > 0 && (
        <div className="sort-controls" role="radiogroup" aria-label="Ordenar por">
          <span className="sort-label">Ordenar por: </span>

          <label className="sort-option">
            <input
              type="radio"
              name="sortMovies"
              value="year"
              checked={sortBy === 'year'}
              onChange={() => setSortBy('year')}
            />
            <span>Año</span>
          </label>

          <label className="sort-option">
            <input
              type="radio"
              name="sortMovies"
              value="title"
              checked={sortBy === 'title'}
              onChange={() => setSortBy('title')}
            />
            <span>Título</span>
          </label>
        </div>
      )}

      {error && <p className="error-message" role="alert">{error}</p>}
      <div className="movie-list">
        {sortedMovies.map((movie) => (
          <div
            className="movie-card"
            key={movie.imdbID}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedMovie(movie)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelectedMovie(movie);
              }
            }}
          >
            <Imagen movie={movie} />
            <p className="movie-title"> &bull; {movie.Year} - {movie.Title} </p>
          </div>
        ))}
      </div>

      {selectedMovie && createPortal(
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close-button"
              type="button"
              aria-label="Cerrar información de la película"
              onClick={() => setSelectedMovie(null)}
            >
              ×
            </button>
            <Imagen movie={selectedMovie} />
            <div className="movie-modal-content">
              <p className="movie-modal-type">{selectedMovie.Type}</p>
              <h2 id="movie-modal-title">{selectedMovie.Title}</h2>
              <p>Año de estreno: {selectedMovie.Year}</p>
              <a
                href={`https://www.imdb.com/title/${selectedMovie.imdbID}/`}
                target="_blank"
                rel="noreferrer"
              >
                Ver información en IMDb
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
export default App;
