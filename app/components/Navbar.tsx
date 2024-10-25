import React from 'react';
// import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-500 p-4 sticky top-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Food Fantasy</h1>
        <div className="space-x-4">
        <a href="#home" className="text-white hover:underline">
        Home
      </a>
      <a href="#howto" className="text-white hover:underline">
        How to
      </a>
      <a href="#meals" className="text-white hover:underline">
      Meals     </a>
      <a href="#add_recipes" className="text-white hover:underline">
        Add Recipes
      </a>
      <a href="#language" className="text-white hover:underline">
        Language
      </a>
      <a href="#register" className="text-white hover:underline">
       Register
      </a>
      <a href="#login" className="text-white hover:underline">
        Login
      </a>
          {/* <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/" className="text-white hover:underline">
            About
          </Link>
          <Link to="/" className="text-white hover:underline">
            Contact
          </Link>
          <Link to="/add-recipe" className="text-white hover:underline">
            Add Recipe
          </Link>
          <Link to="/" className="text-white hover:underline">
            Language
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
