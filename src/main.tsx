import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { loadFonts } from './theme/fonts';
import { setAssetResolver } from './lib/assets';
import './styles/global.css';

setAssetResolver((p) => `${import.meta.env.BASE_URL}${p}`);
loadFonts();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
