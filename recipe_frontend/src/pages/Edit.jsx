import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import { getRecipeById, saveRecipe } from '../services/storage';
import { navigate } from '../router/hashRouter';
import Toast from '../components/Toast';

function parseMultiline(text) {
  return (text || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}
function joinMultiline(arr) {
  return (arr || []).join('\n');
}

// PUBLIC_INTERFACE
export default function Edit({ id }) {
  /** Add/Edit recipe form with validation. */
  const isEdit = !!id;
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [toast, setToast] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEdit) return;
    const r = getRecipeById(id);
    if (r) {
      setTitle(r.title || '');
      setImage(r.image || '');
      setTags((r.tags || []).join(', '));
      setIngredients(joinMultiline(r.ingredients));
      setSteps(joinMultiline(r.steps));
    }
  }, [id, isEdit]);

  const formValid = useMemo(() => {
    return title.trim().length >= 3 && image.trim().length > 0 && steps.trim().length > 0;
  }, [title, image, steps]);

  const validate = () => {
    const e = {};
    if (title.trim().length < 3) e.title = 'Title must be at least 3 characters';
    if (!image.trim()) e.image = 'Image URL is required';
    if (!steps.trim()) e.steps = 'At least one step is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSave = () => {
    if (!validate()) return;
    const payload = {
      id,
      title: title.trim(),
      image: image.trim(),
      tags: tags.split(',').map((x) => x.trim()).filter(Boolean),
      ingredients: parseMultiline(ingredients),
      steps: parseMultiline(steps),
    };
    const saved = saveRecipe(payload);
    setToast(isEdit ? 'Recipe updated' : 'Recipe created');
    setTimeout(() => navigate(`/recipe/${saved.id}`), 600);
  };

  return (
    <div className="app-root">
      <Header query={query} onQueryChange={setQuery} />
      <main className="content-area form" role="main" aria-label={isEdit ? 'Edit recipe' : 'Add recipe'}>
        <div className="section">
          <h2>{isEdit ? 'Edit Recipe' : 'Add Recipe'}</h2>
          <div className="form-grid" style={{ marginTop: 10 }}>
            <div>
              <div className="field">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} aria-invalid={!!errors.title} />
                {errors.title && <span style={{ color: '#b00020' }}>{errors.title}</span>}
              </div>
              <div className="field">
                <label htmlFor="image">Image URL</label>
                <input id="image" type="url" value={image} onChange={(e) => setImage(e.target.value)} aria-invalid={!!errors.image} />
                {errors.image && <span style={{ color: '#b00020' }}>{errors.image}</span>}
              </div>
              <div className="field">
                <label htmlFor="tags">Tags (comma separated)</label>
                <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., breakfast, healthy" />
              </div>
            </div>
            <div>
              <div className="field">
                <label htmlFor="ingredients">Ingredients (one per line)</label>
                <textarea id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="1 cup flour&#10;2 eggs" />
              </div>
              <div className="field">
                <label htmlFor="steps">Steps (one per line)</label>
                <textarea id="steps" value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="Mix ingredients&#10;Bake for 20 min" />
                {errors.steps && <span style={{ color: '#b00020' }}>{errors.steps}</span>}
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn" onClick={() => navigate(isEdit ? `/recipe/${id}` : '/')}>Cancel</button>
            <button className="btn btn-primary" disabled={!formValid} onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </main>
      <Toast message={toast} onHide={() => setToast('')} />
    </div>
  );
}
