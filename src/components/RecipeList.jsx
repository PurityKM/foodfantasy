// import React from 'react';

// const RecipeList = ({ recipes, onRecipeSelect }) => {
//     return ( 
//     <div className = "p-5" >
//         <h1 className = "text-2xl font-bold mb-4" > Recipe List </h1> 
//         <div className = "grid grid-cols-1 md:grid-cols-3 gap-6"> 
//             {
//             recipes.map((recipe) => ( 
//                 <div key = { recipe.id }
//                 className = "bg-white rounded-lg shadow-md p-4 cursor-pointer"
//                 onClick = {
//                     () => onRecipeSelect(recipe)
//                 } >
//                 <h2 className = "text-xl font-semibold" > { recipe.name } </h2>
//                 <p className = "text-gray-600 mt-2" > { recipe.description } </p> 
//                 </div >
//             ))
//         } </div> 
//         </div >
//     );
// };

// export default RecipeList;