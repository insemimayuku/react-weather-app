import React, { useEffect, useState } from 'react';
import { fetchForecast } from '../utils/api';

/**
 * Affiche les prévisions pour la ville ou les coordonnées passées en props
 * props.accepts:
 *   - city   (string)  -> priorité
 *   - coords ({lat, lon})
 */
const Forecast = ({ city, coords }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const params = city ? { q: city } : { lat: coords.lat, lon: coords.lon };
        const { data } = await fetchForecast(params);
        // On filtre 1 entrée / jour à 12:00
        const daily = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
        setForecast(daily.slice(0, 5)); // 5 jours
      } catch (err) {
        setError('Erreur prévisions 5 jours.');
      }
    };
    if (city || coords) load();
  }, [city, coords]);

  if (error) return <p className="text-red-400 text-sm">{error}</p>;
  if (!forecast.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-indigo-700 mb-2">Prévisions 5 jours</h3>
      <div className="flex gap-4 overflow-x-auto pb-1">
        {forecast.map((f) => {
          const date = new Date(f.dt * 1000);
          const day = date.toLocaleDateString('fr-FR', { weekday: 'short' });
          return (
            <div
              key={f.dt}
              className="flex-shrink-0 bg-white/80 backdrop-blur rounded-xl p-3 w-24 text-center shadow"
            >
              <p className="font-medium">{day}</p>
              <p className="text-sm capitalize">{f.weather[0].main}</p>
              <p className="text-xl font-bold">{Math.round(f.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
