import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import RecipeGrid from '../components/RecipeGrid';
import { initStorage, getRecipes, searchRecipes, toggleFavorite } from '../services/storage';
import Toast from '../components/Toast';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page: header with search and recipe grid. */
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    initStorage();
    setLoading(true);
    setTimeout(() => {
      setItems(getRecipes());
      setLoading(false);
    }, 300); // tiny delay for shimmer
  }, []);

  const filtered = useMemo(() => {
    return query ? searchRecipes(query) : items;
  }, [items, query]);

  const handleToggleFav = (id) => {
    const r = toggleFavorite(id);
    setItems((prev) => prev.map((x) => (x.id === id ? r : x)));
    setToast(r?.favorite ? 'Added to favorites' : 'Removed from favorites');
  };

  return (
    <div className="app-root">
      <Header query={query} onQueryChange={setQuery} />
      <main className="content-area" role="main" aria-label="Recipe list">
        <RecipeGrid items={filtered} loading={loading} onToggleFavorite={handleToggleFav} />
      </main>
      <Toast message={toast} onHide={() => setToast('')} />
    </div>
  );
}
