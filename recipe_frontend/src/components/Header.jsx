import React from 'react';
import { navigate } from '../router/hashRouter';

// PUBLIC_INTERFACE
export default function Header({ query, onQueryChange }) {
  /** Ocean Professional header with app title, search input, and Add button. */
  return (
    <header className="header" role="banner">
      <div className="header-title" aria-label="Application title">Recipe Explorer</div>
      <div className="header-search" role="search">
        <label htmlFor="search" className="hidden">Search recipes</label>
        <input
          id="search"
          type="text"
          placeholder="Search recipes by title or tag..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search recipes"
        />
      </div>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={() => navigate('/add')} aria-label="Add recipe">
          + Add Recipe
        </button>
      </div>
    </header>
  );
}
