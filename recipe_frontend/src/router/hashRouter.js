//
// Minimal hash-based router for Tizen web app compatibility
//

const listeners = new Set();

function parseLocation() {
  // Expected formats:
  // #/        => home
  // #/add     => add recipe
  // #/recipe/:id
  // #/edit/:id
  const hash = window.location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'home', params: {} };
  if (parts[0] === 'add') return { name: 'add', params: {} };
  if (parts[0] === 'recipe' && parts[1]) return { name: 'detail', params: { id: parts[1] } };
  if (parts[0] === 'edit' && parts[1]) return { name: 'edit', params: { id: parts[1] } };
  return { name: 'home', params: {} };
}

function notify() {
  const route = parseLocation();
  listeners.forEach((cb) => cb(route));
}

// PUBLIC_INTERFACE
export function initRouter() {
  /** Initialize hashchange listener and emit first route. */
  window.addEventListener('hashchange', notify);
  if (!window.location.hash) {
    window.location.hash = '#/';
  } else {
    // fire initial
    setTimeout(() => notify(), 0);
  }
  return () => window.removeEventListener('hashchange', notify);
}

// PUBLIC_INTERFACE
export function onRouteChange(callback) {
  /** Subscribe to route changes. Returns unsubscribe function. */
  listeners.add(callback);
  // immediately call with current
  callback(parseLocation());
  return () => listeners.delete(callback);
}

// PUBLIC_INTERFACE
export function navigate(to) {
  /** Navigate to a new route hash (e.g., '/add', '/recipe/123'). */
  if (!to.startsWith('/')) {
    // ensure leading slash
    window.location.hash = '#/' + to;
  } else {
    window.location.hash = '#' + to;
  }
}
