import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Récupère la météo courante (ville OU lat/lon)
 */
export const fetchCurrentWeather = (params) =>
  axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: { ...params, appid: API_KEY, units: 'metric', lang: 'fr' },
  });

/**
 * Récupère les prévisions 5 jours / 3 h (40 valeurs)
 */
export const fetchForecast = (params) =>
  axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: { ...params, appid: API_KEY, units: 'metric', lang: 'fr' },
  });
