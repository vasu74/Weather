import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const Input = ({ onSearch, onSuggestions, suggestions = [] }) => {
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
    debouncedSuggestions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  const handleSelect = (selectedCity) => {
    onSearch(selectedCity);
    setCity("");
  };

  const debouncedSuggestions = useCallback(
    debounce((query) => {
      onSuggestions(query);
    }, 300),
    [onSuggestions]
  );

  useEffect(() => {
    return () => {
      debouncedSuggestions.cancel();
    };
  }, [debouncedSuggestions]);

  return (
    <form onSubmit={handleSubmit} className="mb-4 relative">
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Search for a city..."
        className="w-full px-4 py-2 rounded-md shadow-md"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded-md mt-2 z-10 max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default Input;
