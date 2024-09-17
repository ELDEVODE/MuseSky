import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CollectionPage from './pages/CollectionPage';
import ExplorePage from './pages/ExplorePage';
import BlogPage from './pages/BlogPage';
import WalletPage from './pages/WalletPage';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route path={ROUTES.COLLECTION} element={<CollectionPage />} />
        <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
        <Route path={ROUTES.BLOG} element={<BlogPage />} />
        <Route path={ROUTES.WALLET} element={<WalletPage />} />
      </Route>
    </Routes>
  );
}

export default App;
