import React, { useEffect, useState } from "react";

const Favorites = ({ onSelectCity }) => {
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const saveFavorites = (list) => {
    setFavorites(list);
    localStorage.setItem("favorites", JSON.stringify(list));
  };

  const addCity = () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    if (favorites.includes(trimmedCity)) {
      setMessage(`⚠️ ${trimmedCity} est déjà dans les favoris`);
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    const updated = [...favorites, trimmedCity];
    saveFavorites(updated);
    setCity("");
    setMessage(`✅ ${trimmedCity} ajoutée aux favoris`);
    setTimeout(() => setMessage(""), 2000);
  };

  const removeCity = (cityToRemove) => {
    const updated = favorites.filter((c) => c !== cityToRemove);
    saveFavorites(updated);
    setMessage(`🗑️ ${cityToRemove} supprimée`);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 transition-colors">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        ⭐ Villes favorites
      </h3>

      <div className="flex gap-2 mb-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ajouter une ville"
          className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
          onKeyDown={(e) => e.key === "Enter" && addCity()}
        />
        <button
          onClick={addCity}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg"
        >
          +
        </button>
      </div>

      {message && (
        <p
          className={`text-sm mb-2 ${
            message.startsWith("⚠️")
              ? "text-yellow-600"
              : message.startsWith("🗑️")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <ul className="space-y-2">
        {favorites.map((fav) => (
          <li
            key={fav}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg"
          >
            <button
              onClick={() => onSelectCity(fav)}
              className="cursor-pointer text-gray-800 dark:text-white hover:underline text-left flex-1"
            >
              {fav}
            </button>
            <button
              onClick={() => removeCity(fav)}
              className="text-red-500 hover:text-red-600 ml-2"
              aria-label={`Supprimer ${fav} des favoris`}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
