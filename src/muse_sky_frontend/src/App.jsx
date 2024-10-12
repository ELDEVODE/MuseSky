import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { HomePage, AuthPage, CollectionPage, ExplorePage, BlogPage, WalletPage, CollectionDetails, NFTDetail, ArtistDetails } from './pages';
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
        <Route path={`${ROUTES.COLLECTION_DETAILS}/:collectionId`} element={<CollectionDetails />} />
        <Route path={`${ROUTES.NFT_DETAIL}/:nftId`} element={<NFTDetail />} />
        <Route path={`${ROUTES.ARTIST_DETAILS}/:artistId`} element={<ArtistDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
