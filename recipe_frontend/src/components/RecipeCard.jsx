import React from 'react';
import { navigate } from '../router/hashRouter';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onToggleFavorite }) {
  /** Card showing image, title, tags, and favorite toggle. */
  const handleFavorite = () => {
    if (typeof onToggleFavorite === 'function') {
      onToggleFavorite(recipe.id);
    }
  };

  const openDetails = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <article className="card" tabIndex={0} aria-label={`Recipe ${recipe.title}`}>
      <img className="card-img" src={recipe.image} alt={recipe.title} loading="lazy" />
      <div className="card-body">
        <div className="card-title">{recipe.title}</div>
        <div className="tags" aria-label="Tags">
          {(recipe.tags || []).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="card-actions">
        <button
          className="icon-btn"
          onClick={handleFavorite}
          aria-pressed={!!recipe.favorite}
          aria-label="Toggle favorite"
          type="button"
        >
          {recipe.favorite ? '★ Favorite' : '☆ Favorite'}
        </button>
        <button
          className="icon-btn"
          onClick={openDetails}
          aria-label="Open details"
          type="button"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
