import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import './styles/custom.module.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import App from './App'; 
import { GlobalProvider } from './context/GlobalContext'; 
import './i18n';  

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <GlobalProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </GlobalProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
