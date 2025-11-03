import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getRecipeById, deleteRecipe, toggleFavorite } from '../services/storage';
import { navigate } from '../router/hashRouter';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

// PUBLIC_INTERFACE
export default function Detail({ id }) {
  /** Recipe detail page with hero, ingredients, steps, edit and delete actions. */
  const [recipe, setRecipe] = useState(null);
  const [query, setQuery] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setRecipe(getRecipeById(id));
  }, [id]);

  if (!recipe) {
    return (
      <div className="app-root">
        <Header query={query} onQueryChange={setQuery} />
        <main className="content-area">
          <div className="empty">Recipe not found.</div>
        </main>
      </div>
    );
  }

  const handleDelete = () => {
    setConfirm(true);
  };

  const confirmDelete = () => {
    deleteRecipe(recipe.id);
    setToast('Recipe deleted');
    setConfirm(false);
    setTimeout(() => navigate('/'), 600);
  };

  const handleToggleFav = () => {
    const r = toggleFavorite(recipe.id);
    setRecipe(r);
    setToast(r?.favorite ? 'Added to favorites' : 'Removed from favorites');
  };

  return (
    <div className="app-root">
      <Header query={query} onQueryChange={setQuery} />
      <main className="content-area detail" role="main" aria-label="Recipe details">
        <section className="detail-scroll">
          <img className="detail-hero" src={recipe.image} alt={recipe.title} />
          <div className="section">
            <h2 style={{ marginBottom: 6 }}>{recipe.title}</h2>
            <div className="row" style={{ marginTop: 8 }}>
              {(recipe.tags || []).map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="section">
            <h3>Ingredients</h3>
            <ul style={{ marginLeft: 18, marginTop: 10 }}>
              {(recipe.ingredients || []).map((it, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>{it}</li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>Steps</h3>
            <ol style={{ marginLeft: 18, marginTop: 10 }}>
              {(recipe.steps || []).map((st, idx) => (
                <li key={idx} style={{ marginBottom: 8 }}>{st}</li>
              ))}
            </ol>
          </div>
        </section>
        <aside className="section" aria-label="Actions">
          <div className="row">
            <button className="btn btn-primary" onClick={() => navigate(`/edit/${recipe.id}`)}>Edit</button>
            <button className="btn" onClick={handleDelete} style={{ background: '#fff2f2', color: '#b00020', border: '1px solid #ffd7d7' }}>
              Delete
            </button>
            <button className="btn" onClick={handleToggleFav}>
              {recipe.favorite ? '★ Unfavorite' : '☆ Favorite'}
            </button>
            <button className="btn" onClick={() => navigate('/')}>Back to list</button>
          </div>
          <div style={{ marginTop: 16 }}>
            <h4>Quick Info</h4>
            <p style={{ marginTop: 6, color: '#374151' }}>Created: {new Date(recipe.createdAt).toLocaleString()}</p>
            <p style={{ color: '#374151' }}>Updated: {new Date(recipe.updatedAt).toLocaleString()}</p>
          </div>
        </aside>
      </main>

      <ConfirmModal
        open={confirm}
        title="Delete recipe"
        message="Are you sure you want to delete this recipe? This action cannot be undone."
        onCancel={() => setConfirm(false)}
        onConfirm={confirmDelete}
      />
      <Toast message={toast} onHide={() => setToast('')} />
    </div>
  );
}
