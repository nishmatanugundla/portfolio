import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './MovieDetail.css'

const IMG_BASE     = 'https://image.tmdb.org/t/p/w500'
const TMDB_DETAIL  = 'https://api.themoviedb.org/3/movie'
const LOGO_BASE    = 'https://image.tmdb.org/t/p/w92'
const BASE         = import.meta.env.VITE_API_URL || ''

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie]       = useState(null)
  const [providers, setProviders] = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const key = import.meta.env.VITE_TMDB_KEY

    // Fetch movie details + providers in parallel
    Promise.all([
      axios.get(`${TMDB_DETAIL}/${id}`, {
        params: { api_key: key, append_to_response: 'credits' }
      }),
      axios.get(`${BASE}/api/movies/${id}/providers`)
    ])
      .then(([movieRes, providerRes]) => {
        setMovie(movieRes.data)
        setProviders(providerRes.data)
      })
      .catch(() => setMovie(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="detail-loading">Loading...</div>
  if (!movie)  return <div className="detail-loading">Movie not found.</div>

  const director    = movie.credits?.crew?.find(c => c.job === 'Director')
  const cast        = movie.credits?.cast?.slice(0, 6)
  const runtime     = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ''
  const streamList  = providers?.flatrate || []
  const rentList    = providers?.rent || []
  const buyList     = providers?.buy || []

  return (
    <div className="detail">
      {movie.backdrop_path && (
        <div className="detail-backdrop">
          <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt="" />
          <div className="detail-backdrop-overlay" />
        </div>
      )}

      <div className="detail-content">
        <button className="detail-back" onClick={() => navigate(-1)}>← Back</button>

        <div className="detail-main">
          {/* Poster */}
          <div className="detail-poster">
            {movie.poster_path
              ? <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
              : <div className="detail-no-poster">No Image</div>
            }
          </div>

          {/* Info */}
          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>

            <div className="detail-meta">
              {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
              {runtime && <span>{runtime}</span>}
              {movie.original_language && (
                <span className="meta-lang">{movie.original_language.toUpperCase()}</span>
              )}
            </div>

            <div className="detail-rating">
              <span className="detail-star">★</span>
              <span className="detail-score">{movie.vote_average?.toFixed(1)}</span>
              <span className="detail-votes">({movie.vote_count?.toLocaleString()} votes)</span>
            </div>

            {/* Genres + OTT on same row */}
            {(movie.genres?.length > 0 || streamList.length > 0) && (
              <div className="detail-genres-row">
                {movie.genres?.map(g => (
                  <span key={g.id} className="detail-genre-chip">{g.name}</span>
                ))}

                {streamList.length > 0 && (
                  <div className="ott-group">
                    {streamList.map(p => (
                      <div key={p.provider_id} className="ott-badge" title={p.provider_name}>
                        <img
                          src={`${LOGO_BASE}${p.logo_path}`}
                          alt={p.provider_name}
                          className="ott-logo"
                        />
                        <span className="ott-name">{p.provider_name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Rent / Buy if no streaming */}
            {streamList.length === 0 && (rentList.length > 0 || buyList.length > 0) && (
              <div className="ott-rent-row">
                {rentList.length > 0 && (
                  <div className="ott-section">
                    <span className="ott-section-label">Rent</span>
                    <div className="ott-group">
                      {rentList.map(p => (
                        <div key={p.provider_id} className="ott-badge" title={p.provider_name}>
                          <img src={`${LOGO_BASE}${p.logo_path}`} alt={p.provider_name} className="ott-logo" />
                          <span className="ott-name">{p.provider_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {buyList.length > 0 && (
                  <div className="ott-section">
                    <span className="ott-section-label">Buy</span>
                    <div className="ott-group">
                      {buyList.map(p => (
                        <div key={p.provider_id} className="ott-badge" title={p.provider_name}>
                          <img src={`${LOGO_BASE}${p.logo_path}`} alt={p.provider_name} className="ott-logo" />
                          <span className="ott-name">{p.provider_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Not available notice */}
            {streamList.length === 0 && rentList.length === 0 && buyList.length === 0 && providers !== null && (
              <p className="ott-unavailable">Not available on any streaming platform in India</p>
            )}

            {movie.overview && (
              <p className="detail-overview">{movie.overview}</p>
            )}

            {director && (
              <div className="detail-crew">
                <span className="crew-label">Director</span>
                <span className="crew-name">{director.name}</span>
              </div>
            )}

            {cast?.length > 0 && (
              <div className="detail-crew">
                <span className="crew-label">Cast</span>
                <span className="crew-name">{cast.map(c => c.name).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
