import React from 'react';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid({ items, loading, onToggleFavorite }) {
  /** Grid of recipe cards; shows shimmer while loading and empty state if none. */
  if (loading) {
    // simple shimmer placeholders
    return (
      <div className="grid" role="list">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="card" key={i}>
            <div className="card-img shimmer" />
            <div className="card-body">
              <div className="shimmer" style={{ height: 22, borderRadius: 8 }} />
              <div className="row" style={{ marginTop: 10, gap: 8 }}>
                <div className="shimmer" style={{ width: 80, height: 20, borderRadius: 999 }} />
                <div className="shimmer" style={{ width: 60, height: 20, borderRadius: 999 }} />
              </div>
            </div>
            <div className="card-actions" style={{ height: 52 }}>
              <div className="shimmer" style={{ width: 100, height: 28, borderRadius: 10 }} />
              <div className="shimmer" style={{ width: 80, height: 28, borderRadius: 10 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <div className="empty" role="status">No recipes found. Try adding a new one!</div>;
  }

  return (
    <div className="grid" role="list">
      {items.map((r) => (
        <RecipeCard key={r.id} recipe={r} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
}
