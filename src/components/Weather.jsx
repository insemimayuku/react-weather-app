import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY; // Remplace par ta clé API OpenWeatherMap

const Weather = ({ city }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [city]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300">
        Chargement...
      </div>
    );
  }

  if (!data || data.cod !== 200) {
    return (
      <div className="text-center text-red-500">
        Ville introuvable ❌
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-colors">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {data.name}
      </h2>

      <div className="flex items-center gap-4">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="capitalize text-gray-600 dark:text-gray-300">
            {data.weather[0].description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700 dark:text-gray-300">
        <p>💧 Humidité : {data.main.humidity}%</p>
        <p>💨 Vent : {data.wind.speed} km/h</p>
      </div>
    </div>
  );
};

export default Weather;
