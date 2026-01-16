import React, { useState } from 'react';
import Weather from './components/Weather';
import Favorites from './components/Favorites';
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [selectedCity, setSelectedCity] = useState('Paris');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">🌤️ Weathering With You</h1>
        <DarkModeToggle />

        <Favorites onSelectCity={setSelectedCity} />

        <Weather city={selectedCity} />
      </div>
    </div>
  );
}

export default App;
