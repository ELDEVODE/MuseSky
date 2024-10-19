import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import {
  HomePage, AuthPage, CollectionPage,
  ExplorePage, BlogPage, WalletPage,
  CollectionDetails, NFTDetail, ArtistDetails,
  CreateCollection,
  MyCollections,
  CollectionPreview,
  CreateNFT,
  BlogPost,
  // Admin imports
  AdminDashboard,
  BlogPostList,
  BlogPostForm
} from './pages';
import { ROUTES } from './constants/routes';
import LoadingScreen from './components/LoadingScreen';
import NotFoundPage from './pages/NotFoundPage';

// ProtectedRoute component
const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }
  return <Outlet />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loading screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Replace this with your actual authentication logic
    const checkAuth = setTimeout(() => {
      setIsAuthenticated(true); // Set to true for testing purposes
    }, 1000);

    return () => clearTimeout(checkAuth);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
        <Route path={ROUTES.BLOG} element={<BlogPage />} />
        <Route path={ROUTES.BLOG_POST} element={<BlogPost />} />
        <Route path={ROUTES.COLLECTION} element={<CollectionPage />} />
        <Route path={`${ROUTES.COLLECTION_DETAILS}/:collectionId`} element={<CollectionDetails />} />
        <Route path={`${ROUTES.NFT_DETAIL}/:nftId`} element={<NFTDetail />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={ROUTES.WALLET} element={<WalletPage />} />
          <Route path={ROUTES.CREATE_COLLECTION} element={<CreateCollection />} />
          <Route path={ROUTES.CREATE_NFT} element={<CreateNFT />} />
          <Route path={ROUTES.MY_COLLECTIONS} element={<MyCollections />} />
          <Route path={ROUTES.COLLECTION_PREVIEW} element={<CollectionPreview />} />
          <Route path={`${ROUTES.ARTIST_DETAILS}/:artistId`} element={<ArtistDetails />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_BLOG_POSTS} element={<BlogPostList />} />
          <Route path={ROUTES.ADMIN_CREATE_POST} element={<BlogPostForm />} />
          <Route path={ROUTES.ADMIN_EDIT_POST} element={<BlogPostForm />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
