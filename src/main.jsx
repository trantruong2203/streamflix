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
import { MoviesProvider } from './context/MoviesProvider.jsx';
import { EpisodesProvider } from './context/EpisodesProvider.jsx';
import { TrailersProvider } from './context/TrailerProvider.jsx';
import { AccountsProvider } from './context/AccountsProvider.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { FeatureProvider } from './context/FeatureProvider.jsx';
import { PackageProvider } from './context/PackageProvider.jsx';
import { RentMoviesProvider } from './context/RentMoviesProvider.jsx';
import { SubscriptionProvider} from './context/SubscriptionProvider.jsx';
import { Favoritesprovider } from './context/FavoritesProvider.jsx';
import { MovieListProvider } from './context/MovieListProvider.jsx';
import { WatchHistoryProvider } from './context/WatchHistoryProvider.jsx';
import { CommentsProvider } from './context/CommentsProvider.jsx';
const providers = [
  AccountsProvider,
  CategoriesProvider,
  ActorProvider,
  AuthorsProvider,
  PlansProvider,
  NotificationProvider,
  CharactersProvider,
  MoviesProvider,
  EpisodesProvider,
  TrailersProvider,
  AuthProvider,
  FeatureProvider,
  PackageProvider,
  RentMoviesProvider,
  SubscriptionProvider,
  Favoritesprovider,
  MovieListProvider,
  WatchHistoryProvider,
  CommentsProvider
];
const ProviderWrapper = ({ children }) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ProviderWrapper>
        <App />
      </ProviderWrapper>
    </BrowserRouter>,
)
