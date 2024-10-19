export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  COLLECTION: '/collection',
  EXPLORE: '/explore',
  BLOG: '/blog',
  BLOG_POST: '/blog/:postId',
  WALLET: '/wallet',

  // collection routes

  COLLECTION_DETAILS: '/collection',
  COLLECTION_CREATOR: '/collection/:collectionId/creator',

  // NFT route
  NFT_DETAIL: '/nft',

  //Artist routes
  ARTIST_DETAILS: '/artist',


  /** PROTECTED ROUTES **/

  // Collection
  CREATE_COLLECTION: '/:internetId/collections/create',
  MY_COLLECTIONS: '/:internetId/collections/',
  COLLECTION_PREVIEW: '//:internetId/collections/:collectionId',
  EDIT_COLLECTION: '/:internetId/collections/:collectionId/edit',
  CREATE_NFT: '/:internetId/collections/:collectionId/create-nft',

  /** ADMIN ROUTES **/
  ADMIN_DASHBOARD: '/admin',
  ADMIN_BLOG_POSTS: '/admin/blog-posts',
  ADMIN_CREATE_POST: '/admin/blog-posts/create',
  ADMIN_EDIT_POST: '/admin/blog-posts/:postId/edit',
};
