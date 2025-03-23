import axios from 'axios';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWFhMjY1YzNlMGZiNzJhZjhmYzRmZTY2MWMwMGVjNiIsIm5iZiI6MTc0MjY3OTcyMi4wOTEsInN1YiI6IjY3ZGYyZWFhZTRhOWM4NjkwNjA3YjRmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M2_isZjfoWgklYMudY8UVScrm57R-WMAVvRj-WBa4aE';
const API_KEY = '4eaa265c3e0fb72af8fc4fe661c00ec6';

export const fetchTrendingMovies = async () => {
  const resp = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day',
    {
      params: {
        api_key: `${API_KEY}`,
      },
    }
  );
  return resp.data.results || [];
};
export const fetchMovieDetails = async movie_id => {
  const resp = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`,
    {
      params: {
        api_key: `${API_KEY}`,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return resp.data || [];
};
export const fetchMovieCast = async movie_id => {
  const resp = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    {
      params: {
        api_key: `${API_KEY}`,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return resp.data.cast || [];
};
export const fetchMovieReviews = async movie_id => {
  const resp = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
    {
      params: {
        api_key: `${API_KEY}`,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return resp.data.results || [];
};
export const fetchMovieByName = async query => {
  if (!query) return [];

  const resp = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      api_key: `${API_KEY}`,
      query,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return resp.data.results || [];
};
