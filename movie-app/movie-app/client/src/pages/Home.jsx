import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import Filters from '../components/Filters'
import MovieCard from '../components/MovieCard'
import './Home.css'

const BASE = import.meta.env.VITE_API_URL || ''
const DEFAULT_FILTERS = { language: '', genre: '', year: '', rating: '' }

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [genres, setGenres]   = useState([])
  const [movies, setMovies]   = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [page, setPage]       = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const debounceRef = useRef(null)

  useEffect(() => {
    axios.get(`${BASE}/api/genres`)
      .then(r => setGenres(r.data))
      .catch(() => {})
  }, [])

  const fetchMovies = useCallback(async (activeFilters, pageNum) => {
    setLoading(true)
    setError('')
    try {
      const params = { page: pageNum }
      if (activeFilters.language) params.language = activeFilters.language
      if (activeFilters.genre)    params.genre    = activeFilters.genre
      if (activeFilters.year)     params.year     = activeFilters.year
      if (activeFilters.rating)   params.rating   = activeFilters.rating

      const res = await axios.get(`${BASE}/api/movies`, { params })
      if (pageNum === 1) {
        setMovies(res.data.movies)
      } else {
        setMovies(prev => [...prev, ...res.data.movies])
      }
      setTotalPages(res.data.total_pages)
      setTotalResults(res.data.total_results)
    } catch {
      setError('Failed to load movies. Please check your API key.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setPage(1)
      fetchMovies(filters, 1)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [filters, fetchMovies])

  const handleFilterChange = (newFilters) => setFilters(newFilters)
  const handleReset = () => setFilters(DEFAULT_FILTERS)
  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchMovies(filters, nextPage)
  }

  const activeCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="app">
      <header className="nav">
        <div className="nav-inner">
          <span className="nav-logo">🎬 CineFind</span>
          <span className="nav-sub">Discover movies across languages</span>
        </div>
      </header>

      <div className="layout">
        <Filters filters={filters} genres={genres} onChange={handleFilterChange} onReset={handleReset} />

        <main className="movies-pane">
          <div className="results-bar">
            <span className="results-count">
              {loading && page === 1 ? 'Loading...' : `${totalResults.toLocaleString()} movies`}
            </span>
            {activeCount > 0 && (
              <span className="active-filters">{activeCount} filter{activeCount > 1 ? 's' : ''} active</span>
            )}
          </div>

          {error && <div className="error-msg">{error}</div>}

          {movies.length > 0 && (
            <div className="movies-grid">
              {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
          )}

          {!loading && movies.length === 0 && !error && (
            <div className="empty-state">
              <span className="empty-icon">🎞️</span>
              <p>No movies found for these filters.</p>
              <button onClick={handleReset} className="btn-reset-empty">Clear filters</button>
            </div>
          )}

          {movies.length > 0 && page < totalPages && (
            <div className="load-more-wrap">
              <button className="btn-load-more" onClick={loadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}

          {loading && page === 1 && (
            <div className="movies-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-poster" />
                  <div className="skeleton-body">
                    <div className="skeleton-line w80" />
                    <div className="skeleton-line w40" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
