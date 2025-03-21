import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoriesProvider.jsx';
import { NotificationProvider } from './context/NotificationProvide.jsx';
import { ActorProvider } from './context/ActorProvide.jsx';
import { AuthorsProvider } from './context/AuthorsProvider.jsx';
import { PlansProvider } from './context/PlansProvider.jsx';
import { CharactersProvider } from './context/CharactersProvider.jsx';

const providers = [
  CategoriesProvider,
  ActorProvider,
  AuthorsProvider,
  PlansProvider,
  NotificationProvider,
  CharactersProvider
];
const ProviderWrapper = ({ children }) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProviderWrapper>
        <App />
      </ProviderWrapper>
    </BrowserRouter>
  </StrictMode>,
)
