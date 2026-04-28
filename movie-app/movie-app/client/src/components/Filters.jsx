import './Filters.css'

const LANGUAGES = ['Telugu', 'Hindi', 'Malayalam', 'Kannada', 'English', 'Tamil']
const RATINGS   = ['6', '7', '7.5', '8', '8.5', '9']
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 36 }, (_, i) => String(CURRENT_YEAR - i))

export default function Filters({ filters, genres, onChange, onReset }) {
  const set = (key, val) => onChange({ ...filters, [key]: val })

  return (
    <aside className="filters">
      <div className="filters-header">
        <h2 className="filters-title">Filters</h2>
        <button className="filters-reset" onClick={onReset}>Reset</button>
      </div>

      {/* Language */}
      <div className="filter-group">
        <label className="filter-label">Language</label>
        <div className="filter-chips">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              className={`chip ${filters.language === lang ? 'chip-active' : ''}`}
              onClick={() => set('language', filters.language === lang ? '' : lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div className="filter-group">
        <label className="filter-label">Genre</label>
        <select
          className="filter-select"
          value={filters.genre}
          onChange={e => set('genre', e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div className="filter-group">
        <label className="filter-label">Release Year</label>
        <select
          className="filter-select"
          value={filters.year}
          onChange={e => set('year', e.target.value)}
        >
          <option value="">Any Year</option>
          {YEARS.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* IMDB Rating */}
      <div className="filter-group">
        <label className="filter-label">Minimum IMDB Rating</label>
        <div className="filter-chips">
          {RATINGS.map(r => (
            <button
              key={r}
              className={`chip ${filters.rating === r ? 'chip-active' : ''}`}
              onClick={() => set('rating', filters.rating === r ? '' : r)}
            >
              ★ {r}+
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
