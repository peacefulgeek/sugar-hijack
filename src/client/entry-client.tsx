import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const ssrData = (window as any).__SSR_DATA__ || {};

hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <App ssrData={ssrData} />
  </BrowserRouter>
);
