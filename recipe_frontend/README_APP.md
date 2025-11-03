# Recipe Explorer - Tizen Web Frontend

This is a modern Ocean Professional themed Tizen-friendly web app built with React + Vite. It provides:
- Header with search
- Recipe list/grid with favorites
- Recipe detail view
- Add/Edit recipe form
- Hash-based routing suitable for Tizen
- LocalStorage-backed CRUD with seed data
- Toast notifications and confirm modal
- Smooth transitions and responsive-feel within a fixed 1920x1080 canvas

## Run (Preview on port 3000)
- npm install
- npm run dev (or npm run preview after build)
- The app opens on http://localhost:5173 by default for dev and http://localhost:4173 for preview.
- Your environment may proxy preview to port 3000. The task acceptance mentions preview on port 3000; using `npm run preview` in the container should expose it accordingly.

## Build
- npm run build
- npm run preview

## Tizen Packaging (example)
This project includes `config.xml`. To package as WGT:
- npm run build:tizen
- npm run package:tizen
The widget is generated as `app.wgt` in the project root (beside `config.xml`).

## Notes
- All data lives in `localStorage` under keys `recipes_v1` and `recipes_favorites_v1`.
- Routing is hash-based and handled by `src/router/hashRouter.js`.
- Keyboard remote back (keyCode 10009) navigates to home from inner pages.
- Basic accessibility is included (semantic roles, focus for toasts and modals).
