import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-500 p-4 fixed">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Food Fantasy</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">
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
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
