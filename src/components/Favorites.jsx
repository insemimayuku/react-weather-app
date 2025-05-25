import React, { useState, useEffect } from 'react';

const Favorites = ({ onSelectCity }) => {
  const [cityInput, setCityInput] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState(null);

  // Charge les villes favorites depuis le localStorage au chargement
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Sauvegarde les favoris à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddCity = () => {
    const city = cityInput.trim();
    if (!city) return;

    if (favorites.includes(city)) {
      showMessage(`⚠️ "${city}" est déjà dans vos favoris`, 'warning');
    } else {
      setFavorites([...favorites, city]);
      setCityInput('');
      showMessage(`✅ "${city}" ajouté aux favoris`, 'success');
    }
  };

  const handleRemoveCity = (city) => {
    const updatedFavorites = favorites.filter(fav => fav !== city);
    setFavorites(updatedFavorites);
    showMessage(`🗑️ "${city}" supprimé des favoris`, 'danger');
  };

  const handleSelect = (city) => {
    onSelectCity(city);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">🌍 Villes enregistrées</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border p-2 rounded-md"
          placeholder="Ajouter une ville..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddCity}
        >
          Ajouter
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded-md text-sm ${
            message.type === 'danger'
              ? 'bg-red-100 text-red-800'
              : message.type === 'warning'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <ul className="space-y-2">
        {favorites.map((city, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
          >
            <button
              onClick={() => handleSelect(city)}
              className="text-blue-600 hover:underline text-left"
            >
              {city}
            </button>
            <button
              onClick={() => handleRemoveCity(city)}
              className="text-red-500 hover:text-red-700"
              title="Supprimer"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
