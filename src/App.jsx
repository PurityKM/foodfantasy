import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeForm from './components/RecipeForm';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Import the Home component

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, { id: recipes.length + 1, ...newRecipe }]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-5">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Use the Home component here */}
            <Route path="/add-recipe" element={<RecipeForm onAddRecipe={handleAddRecipe} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
