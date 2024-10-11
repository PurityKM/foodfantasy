import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios for API calls

const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [mustHaveIngredient, setMustHaveIngredient] = useState('');
  const [videos, setVideos] = useState([]); // State for storing fetched videos

  const popularIngredients = ["Tomato", "Chicken", "Pasta", "Garlic", "Cheese"];
  const mustHaveOptions = ["Salt", "Pepper", "Olive Oil", "Onion", "Butter"];

  // Add ingredient to the selected list
  const handleAddIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // Remove ingredient from selected list
  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
  };

  // Handle dropdown selection for must-have ingredient
  const handleMustHaveChange = (event) => {
    const selectedIngredient = event.target.value;
    if (!selectedIngredients.includes(selectedIngredient)) {
      setSelectedIngredients([...selectedIngredients, selectedIngredient]);
    }
    setMustHaveIngredient(selectedIngredient);
  };

  // Fetch videos from YouTube API based on selected ingredients or random videos
  const fetchRecipeVideos = async (query = '') => {
    const apiKey = 'AIzaSyBOTrcXlyeRF-F2cgN6DROgLJxQt67qgX4'; // Add your YouTube Data API key here
    const searchQuery = query ? query + ' recipe' : 'random recipe'; // Create search query from ingredients or use default

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${apiKey}&maxResults=6`
      );
      setVideos(response.data.items); // Set the videos data
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // UseEffect hook to fetch videos
  useEffect(() => {
    if (selectedIngredients.length > 0) {
      const searchQuery = selectedIngredients.join(' ');
      fetchRecipeVideos(searchQuery);
    } else {
      fetchRecipeVideos(); // Fetch random videos if no ingredients are selected
    }
  }, [selectedIngredients]);

  return (
    <div className="p-5 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Food Fantasy!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Discover and create delicious recipes. Start by adding your favorite ingredients or browse through our collection!
      </p>

      {/* Popular Ingredients and Must Have Ingredients in the same row */}
      <div className="flex justify-center items-start space-x-6 mb-6">
        {/* Popular Ingredients */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Popular Ingredients:</h2>
          <div className="flex space-x-2">
            {popularIngredients.map((ingredient) => (
              <button
                key={ingredient}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center"
                onClick={() => handleAddIngredient(ingredient)}
              >
                <span className="mr-1">+</span>{ingredient}
              </button>
            ))}
          </div>
        </div>

        {/* Must Have Ingredient Dropdown */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Must Have Ingredient:</h2>
          <select
            value={mustHaveIngredient}
            onChange={handleMustHaveChange}
            className="w-[250px] border border-gray-300 rounded-md p-2 mb-2"
          >
            <option value="" disabled>Select a must-have ingredient...</option>
            {mustHaveOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Your Ingredients Section */}
      {selectedIngredients.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Ingredients:</h3>
          <div className="flex flex-wrap justify-center space-x-2">
            {selectedIngredients.map((ingredient) => (
              <span key={ingredient} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-md flex items-center">
                {ingredient}
                <button
                  className="ml-2 text-red-600 hover:text-red-800"
                  onClick={() => handleRemoveIngredient(ingredient)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-md text-gray-600 mb-4">
        Enter more ingredients to find matching recipes.
      </p>

      {/* Recipe Videos Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recipe Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.id.videoId} className="bg-white shadow-md rounded-md overflow-hidden">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full" />
                  <h3 className="text-lg font-bold p-4">{video.snippet.title}</h3>
                </a>
              </div>
            ))
          ) : (
            <p>Loading recipes...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
