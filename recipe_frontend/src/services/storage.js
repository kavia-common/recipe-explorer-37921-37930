//
// Local storage service for recipes with seed data, CRUD, and helpers
//

const STORAGE_KEY = 'recipes_v1';
const FAVORITES_KEY = 'recipes_favorites_v1';

// Fallback UUID generator to avoid depending on Web Crypto in Node build
function genId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// PUBLIC_INTERFACE
export function initStorage() {
  /** Initialize storage with seed data if none exists. */
  if (!localStorage.getItem(STORAGE_KEY)) {
    const seed = [
      {
        id: genId(),
        title: 'Ocean Lemon Salmon',
        image:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
        tags: ['seafood', 'healthy', 'dinner'],
        ingredients: [
          '2 salmon fillets',
          '1 lemon, sliced',
          '2 cloves garlic, minced',
          '1 tbsp olive oil',
          'Salt & pepper to taste',
        ],
        steps: [
          'Preheat oven to 200°C (392°F).',
          'Place salmon on tray; season with salt, pepper, garlic.',
          'Top with lemon slices and drizzle olive oil.',
          'Bake for 12–15 minutes until flaky.',
        ],
        favorite: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        title: 'Amber Spiced Latte',
        image:
          'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop',
        tags: ['beverage', 'breakfast', 'coffee'],
        ingredients: [
          '1 cup milk',
          '1 espresso shot',
          '1 tsp brown sugar',
          'Pinch of cinnamon',
        ],
        steps: [
          'Warm milk and whisk until frothy.',
          'Brew espresso.',
          'Combine espresso, sugar, and milk.',
          'Top with cinnamon.',
        ],
        favorite: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        title: 'Blueberry Overnight Oats',
        image:
          'https://images.unsplash.com/photo-1526312426976-593c2a6a0808?q=80&w=1200&auto=format&fit=crop',
        tags: ['breakfast', 'healthy', 'quick'],
        ingredients: [
          '1/2 cup rolled oats',
          '1/2 cup milk',
          '1/4 cup yogurt',
          'Handful of blueberries',
          '1 tsp honey',
        ],
        steps: [
          'Mix oats, milk, yogurt, and honey.',
          'Refrigerate overnight.',
          'Top with blueberries to serve.',
        ],
        favorite: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
  if (!localStorage.getItem(FAVORITES_KEY)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify({}));
  }
}

// PUBLIC_INTERFACE
export function getRecipes() {
  /** Return all recipes from localStorage. */
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// PUBLIC_INTERFACE
export function getRecipeById(id) {
  /** Return a single recipe by id or null. */
  return getRecipes().find((r) => r.id === id) || null;
}

// PUBLIC_INTERFACE
export function saveRecipe(recipe) {
  /** Create or update a recipe. Returns saved recipe with timestamps. */
  const list = getRecipes();
  if (recipe.id) {
    const idx = list.findIndex((r) => r.id === recipe.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...recipe, updatedAt: Date.now() };
    } else {
      list.push({
        ...recipe,
        id: recipe.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  } else {
    list.push({
      ...recipe,
      id: genId(),
      favorite: recipe.favorite ?? false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list.find((r) => r.id === (recipe.id || list[list.length - 1].id));
}

// PUBLIC_INTERFACE
export function deleteRecipe(id) {
  /** Delete a recipe by id. Returns true if deleted. */
  const list = getRecipes();
  const newList = list.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  return newList.length !== list.length;
}

// PUBLIC_INTERFACE
export function toggleFavorite(id) {
  /** Toggle favorite flag on recipe by id. Returns updated recipe or null. */
  const list = getRecipes();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], favorite: !list[idx].favorite, updatedAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list[idx];
}

// PUBLIC_INTERFACE
export function searchRecipes(query) {
  /** Search recipes by title or tag (case-insensitive). */
  const q = (query || '').trim().toLowerCase();
  if (!q) return getRecipes();
  return getRecipes().filter((r) => {
    const inTitle = r.title.toLowerCase().includes(q);
    const inTags = (r.tags || []).some((t) => t.toLowerCase().includes(q));
    return inTitle || inTags;
  });
}
