import React, { useEffect, useState } from 'react';
import { useTizenKeys } from './hooks/useTizenKeys';
import { initRouter, onRouteChange, navigate } from './router/hashRouter';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import './styles/theme.css';

// Keep legacy css but not used anymore; retained for compatibility
import './App.css';

function App() {
  const [route, setRoute] = useState({ name: 'home', params: {} });

  useEffect(() => {
    const offRouter = initRouter();
    const off = onRouteChange((r) => setRoute(r));
    return () => {
      off();
      offRouter?.();
    };
  }, []);

  // Back button behavior: if not home, go back to home, else do nothing.
  useTizenKeys({
    onBack: () => {
      if (route.name !== 'home') {
        navigate('/');
      }
    },
  });

  if (route.name === 'detail') {
    return <Detail id={route.params.id} />;
  }
  if (route.name === 'add') {
    return <Edit />;
  }
  if (route.name === 'edit') {
    return <Edit id={route.params.id} />;
  }
  return <Home />;
}

export default App;
