import React from 'react';

const RecipeDetail = ({ selectedRecipe }) => {
  if (!selectedRecipe) return <div className="p-5">Select a recipe to see details.</div>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">{selectedRecipe.name}</h1>
      <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
      <p className="font-semibold">Cooking Time: {selectedRecipe.cooking_time} minutes</p>
    </div>
  );
};

export default RecipeDetail;
