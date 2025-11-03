# Node Compatibility

This project is configured for Node 18 using Vite 5.

If you encounter an error stating that Vite requires Node >=20, it is likely that a newer Vite version was installed due to a lockfile or cache. To fix:

1. Remove existing dependencies:
   - rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock
2. Install fresh:
   - npm install
3. Build/preview again:
   - npm run build
   - npm run preview

Pinned versions in package.json:
- vite 5.4.11
- @vitejs/plugin-react 4.2.1
- react/react-dom 18.2.0
