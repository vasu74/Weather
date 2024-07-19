import React, { useState } from "react";
import TopButtons from "./components/TopButtons";
import Input from "./components/Input";
import TimeLoc from "./components/TimeLoc";
import WeatherDetails from "./components/WeatherDetails";
import RecentSearches from "./components/RecentSearches";
import axios from "axios";

const API_KEY = "a40b4fbe683c5cdf565488f86de04487";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
      setRecentSearches((prevSearches) => {
        const newSearches = [
          city,
          ...prevSearches.filter((search) => search !== city),
        ];
        return newSearches.slice(0, 5);
      });
      setSuggestions([]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setError("City not found");
    }
  };

  const handleSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=5&appid=${API_KEY}`
      );
      const uniqueSuggestions = Array.from(
        new Set(response.data.list.map((item) => item.name))
      );
      setSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-br from-cyan-600 to-blue-700 shadow-xl shadow-gray-400">
      <TopButtons toggleUnit={toggleUnit} unit={unit} />
      <Input
        onSearch={handleSearch}
        onSuggestions={handleSuggestions}
        suggestions={suggestions}
      />
      <TimeLoc />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {weather && <WeatherDetails weather={weather} unit={unit} />}
      <RecentSearches searches={recentSearches} onSearch={handleSearch} />
    </div>
  );
}
