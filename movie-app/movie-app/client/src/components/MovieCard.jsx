import { Link } from 'react-router-dom'
import './MovieCard.css'

const IMG_BASE = 'https://image.tmdb.org/t/p/w400'

export default function MovieCard({ movie }) {
  const { id, title, poster_path, release_date, vote_average, overview } = movie
  const year = release_date?.slice(0, 4)
  const rating = vote_average?.toFixed(1)
  const ratingNum = parseFloat(rating)

  const ratingClass = ratingNum >= 8 ? 'rating-high' : ratingNum >= 6.5 ? 'rating-mid' : 'rating-low'

  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <div className="movie-poster">
        {poster_path ? (
          <img src={`${IMG_BASE}${poster_path}`} alt={title} loading="lazy" />
        ) : (
          <div className="movie-no-poster">
            <span>No Image</span>
          </div>
        )}
        <span className={`movie-rating ${ratingClass}`}>★ {rating}</span>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        {year && <span className="movie-year">{year}</span>}
        {overview && <p className="movie-overview">{overview}</p>}
      </div>
    </Link>
  )
}
