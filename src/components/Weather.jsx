import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import { fetchCurrentWeather } from '../utils/api';


const Weather = () => {
  /* ───────── States ───────── */
  const [city, setCity]       = useState('');
  const [weather, setWeather] = useState(null);
  const [coords, setCoords]   = useState(null);      // { lat, lon } si géoloc
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  /* ───────── Géolocalisation automatique ───────── */
  useEffect(() => {
    if (!navigator.geolocation) return;

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        setCoords({ lat, lon });
        try {
          const { data } = await fetchCurrentWeather({ lat, lon });
          setWeather(data);
          setError(null);
        } catch {
          setError('Erreur géolocalisation ou API.');
        } finally {
          setLoading(false);
        }
      },
      () => setLoading(false),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, []);

  /* ───────── Recherche manuelle ───────── */
  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const { data } = await fetchCurrentWeather({ q: city });
      setWeather(data);
      setCoords(null);              // on efface les coords (ville prioritaire)
      setError(null);
    } catch {
      setWeather(null);
      setError('Ville introuvable ou erreur API.');
    } finally {
      setLoading(false);
    }
  };

  /* ───────── Mini-animations conditionnelles ───────── */
  const renderWeatherAnimation = () => {
    if (!weather) return null;
    const condition = weather.weather[0].main;

    const base = 'animate-pulse shadow-lg';
    switch (condition) {
      case 'Clear':
        return <div className="mx-auto mt-4 w-20 h-20 bg-yellow-400 rounded-full animate-pulse" />;
      case 'Rain':
        return (
          <div className="mt-4 flex justify-center space-x-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-4 bg-blue-500 rounded-full animate-bounce"
                   style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        );
      case 'Clouds':
        return (
          <div className="mt-4 flex justify-center gap-2">
            <div className={`w-10 h-10 bg-gray-300 rounded-full ${base}`} />
            <div className={`w-16 h-16 bg-gray-400 rounded-full ${base}`} />
          </div>
        );
      case 'Snow':
        return (
          <div className="mt-4 flex justify-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-white rounded-full animate-bounce"
                   style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  /* ───────── UI ───────── */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          🌤 Ma Météo
        </h1>

        {/* ─── Input + bouton ─── */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Entrez une ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={getWeather}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Rechercher
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <p className="text-center animate-pulse text-indigo-600">
            Chargement…
          </p>
        )}

        {/* Erreur */}
        {error && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}

        {/* Météo actuelle */}
        {weather && !loading && (
          <div className="mt-6 text-center bg-indigo-50 rounded-xl p-4">
            <h2 className="text-xl font-semibold text-indigo-700">
              {weather.name}
            </h2>
            <p className="capitalize text-gray-700">
              {weather.weather[0].description}
            </p>
            <p className="mt-2 text-4xl font-bold">
              {Math.round(weather.main.temp)}°C
            </p>

            <div className="mt-4 flex justify-center gap-6 text-gray-600 text-sm">
              <p>💧 {weather.main.humidity}%</p>
              <p>💨 {weather.wind.speed} m/s</p>
            </div>

            {/* Animation */}
            {renderWeatherAnimation()}

            {/* Prévisions 5 jours */}
            <Forecast city={coords ? null : weather.name} coords={coords} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
