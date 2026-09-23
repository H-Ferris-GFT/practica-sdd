type Movie = {
  Poster?: string;
  Title?: string;
  Type?: string;
};

function hasValidImg(movie?: Movie): movie is Movie {
  return !!(movie?.Poster && movie.Poster !== "N/A");
}

const Imagen = ({ movie }: { movie?: Movie }) => {
  if (hasValidImg(movie)) {
    return <img src={movie.Poster} alt={movie.Title || movie.Type} />;
  }

  return <span>No hay Imágen</span>;
};

export default Imagen;
