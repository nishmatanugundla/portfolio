import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const TMDB_KEY = process.env.TMDB_API_KEY

// TMDB language code map
const LANGUAGE_MAP = {
  Telugu:    'te',
  Hindi:     'hi',
  Malayalam: 'ml',
  Kannada:   'kn',
  English:   'en',
  Tamil:     'ta',
}

app.use(cors())
app.use(express.json())

app.get('/api/movies', async (req, res) => {
  try {
    const { language, year, genre, rating, page = 1 } = req.query

    const params = {
      api_key: TMDB_KEY,
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page,
    }

    if (language && LANGUAGE_MAP[language]) {
      params.with_original_language = LANGUAGE_MAP[language]
    }

    if (year) {
      params.primary_release_year = year
    }

    if (genre) {
      params.with_genres = genre
    }

    if (rating) {
      params['vote_average.gte'] = rating
    }

    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', { params })

    res.json({
      movies: response.data.results,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
      page: response.data.page,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Failed to fetch movies' })
  }
})

app.get('/api/genres', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: { api_key: TMDB_KEY }
    })
    res.json(response.data.genres)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genres' })
  }
})


app.get('/api/movies/:id/providers', async (req, res) => {
  try {
    const { id } = req.params
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      { params: { api_key: TMDB_KEY } }
    )
    // Return IN (India) providers — fallback to US
    const results = response.data.results
    const providers = results?.IN || results?.US || null
    res.json(providers)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch providers' })
  }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
