import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as typeof fetch;
  });

  test('renders the movie search controls', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /buscador de películas/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/buscar películas/i)).toBeInTheDocument();
    const searchButton = screen.getByRole('button', { name: /buscar/i });

    expect(searchButton).toBeInTheDocument();
    expect(searchButton.querySelector('.search-icon')).toHaveAttribute('src', '/search.png');
  });

  test('searches movies by query', async () => {
    mockFetch.mockResolvedValue({
      json: async () => ({
        Search: [
          {
            Title: 'Star Wars',
            Year: '1977',
            imdbID: 'tt0076759',
            Type: 'movie',
            Poster: 'https://example.com/poster.jpg'
          }
        ],
        Response: 'True'
      })
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/buscar películas/i);
    fireEvent.change(input, { target: { value: 'batman' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('s=batman')
    );
    expect(await screen.findByText(/star wars/i)).toBeInTheDocument();
  });

  test('opens movie information when clicking a movie card', async () => {
    mockFetch.mockResolvedValue({
      json: async () => ({
        Search: [
          {
            Title: 'Star Wars',
            Year: '1977',
            imdbID: 'tt0076759',
            Type: 'movie',
            Poster: 'https://example.com/poster.jpg'
          }
        ],
        Response: 'True'
      })
    });

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    const movieCard = await screen.findByRole('button', { name: /star wars/i });
    fireEvent.click(movieCard);

    expect(screen.getByRole('dialog')).toHaveTextContent('Star Wars');
    expect(screen.getByRole('dialog')).toHaveTextContent('Año de estreno: 1977');
    expect(screen.getByRole('link', { name: /ver información en imdb/i })).toHaveAttribute(
      'href',
      'https://www.imdb.com/title/tt0076759/'
    );
  });

  test('sorts movies by year and title', async () => {
    mockFetch.mockResolvedValue({
      json: async () => ({
        Search: [
          {
            Title: 'Batman Begins',
            Year: '2005',
            imdbID: 'tt1',
            Type: 'movie',
            Poster: 'https://example.com/batman.jpg'
          },
          {
            Title: 'The Dark Knight',
            Year: '2008',
            imdbID: 'tt2',
            Type: 'movie',
            Poster: 'https://example.com/dark.jpg'
          },
          {
            Title: 'Batman',
            Year: '1989',
            imdbID: 'tt3',
            Type: 'movie',
            Poster: 'https://example.com/batman2.jpg'
          }
        ],
        Response: 'True'
      })
    });

    const { container } = render(<App />);

    const input = screen.getByPlaceholderText(/buscar películas/i);
    fireEvent.change(input, { target: { value: 'batman' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    const yearRadio = await screen.findByRole('radio', { name: /año/i });
    fireEvent.click(yearRadio);

    const orderedByYear = Array.from(container.querySelectorAll('.movie-title')).map(
      (node) => node.textContent?.replace(/\s+/g, ' ').trim()
    );
    expect(orderedByYear).toEqual([
      '• 1989 - Batman',
      '• 2005 - Batman Begins',
      '• 2008 - The Dark Knight'
    ]);

    const titleRadio = screen.getByRole('radio', { name: /título/i });
    fireEvent.click(titleRadio);

    const orderedByTitle = Array.from(container.querySelectorAll('.movie-title')).map(
      (node) => node.textContent?.replace(/\s+/g, ' ').trim()
    );
    expect(orderedByTitle).toEqual([
      '• 1989 - Batman',
      '• 2005 - Batman Begins',
      '• 2008 - The Dark Knight'
    ]);
  });

  test('shows an error when the query is empty', () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/buscar películas/i);
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/debes ingresar una película/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('shows a message when the API returns no results', async () => {
    mockFetch.mockResolvedValue({
      json: async () => ({
        Response: 'False',
        Error: 'No se encontraron resultados'
      })
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/buscar películas/i);
    fireEvent.change(input, { target: { value: 'película inexistente' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se encontraron resultados/i);
  });

  test('shows an error when the fetch request fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network Error'));

    render(<App />);

    const input = screen.getByPlaceholderText(/buscar películas/i);
    fireEvent.change(input, { target: { value: 'batman' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/ha habido algún error al buscar películas/i);
  });

  test('shows loading state while fetching results', async () => {
    let resolveFetch: (value: { json: () => Promise<{ Response: string; Search: unknown[] }>}) => void;

    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    render(<App />);

    const input = screen.getByPlaceholderText(/buscar películas/i);
    fireEvent.change(input, { target: { value: 'batman' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(screen.getByRole('button', { name: /buscando/i })).toBeDisabled();

    resolveFetch!({
      json: async () => ({
        Response: 'True',
        Search: []
      })
    });

    expect(await screen.findByRole('button', { name: /buscar/i })).toBeEnabled();
  });

  test('clears the search input when clicking the clear button', () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/buscar películas/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'star wars' } });

    const clearButton = screen.getByRole('button', { name: /vaciar búsqueda/i });
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
    expect(screen.queryByRole('button', { name: /vaciar búsqueda/i })).not.toBeInTheDocument();
  });
});
