import React, { useState, useEffect, useCallback, useRef } from 'react'
import { bull } from '../assets/images'
import { blogPosts } from '../constants/testData';
import BlogCard from '../components/BlogCard';
import BlogLoadingIndicator from '../components/BlogLoadingIndicator';
import { TwinkleStars } from '../components';

// Sample featured blog data
const featuredBlogs = [
  {
    id: 1,
    title: "Cost Comparison: ICP vs. Ethereum for NFT Operations",
    content: "Lorem ipsum dolor sit amet consectetur. Duis sagittis sed vulputate in commodo porta. Tincidunt eget euismod rhoncus enim ipsum viverra in cras sed. Cursus condimentum a tellus sit etiam volutpat enim.",
    date: "October 15, 2024",
    image: bull
  },
  {
    id: 2,
    title: "The Future of NFTs: Trends to Watch in 2025",
    content: "Explore the emerging trends shaping the NFT landscape in the coming year. From interactive NFTs to cross-chain compatibility, discover what's next in the world of digital collectibles.",
    date: "November 3, 2024",
    image: bull // You might want to use different images for each blog
  },
  {
    id: 3,
    title: "How MuseSky is Revolutionizing the NFT Marketplace",
    content: "Dive into the unique features and innovations that set MuseSky apart in the crowded NFT marketplace. Learn how we're empowering artists and collectors alike.",
    date: "December 1, 2024",
    image: bull
  }
]

function BlogPage() {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlogIndex((prevIndex) =>
        prevIndex === featuredBlogs.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const loadMorePosts = useCallback(() => {
    setLoading(true);
    // Simulating an API call with setTimeout
    setTimeout(() => {
      const newPosts = blogPosts.slice((page - 1) * 9, page * 9);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
      if (newPosts.length < 9) {
        setHasMore(false);
      }
    }, 3000);
  }, [page]);

  useEffect(() => {
    loadMorePosts();
  }, []);

  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMorePosts]);

  return (
    <div className="min-h-screen text-white relative">
      <div className="max-w-6xl mx-auto px-4 py-12 mt-16 relative">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-['Bricolage Grotesque'] uppercase mb-3">
            Blogs
          </h1>
          <p className="text-lg text-[#dfdfd1] font-['Onest']">
            News and resources from we at MUSESKY on everything on NFTs
          </p>
        </header>

        <main>
          {/* Featured blogs carousel */}
          <div className="mb-12 relative">
            <div className="overflow-hidden h-[400px] sm:h-[400px] md:h-[350px]">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentBlogIndex * 100}%)` }}
              >
                {featuredBlogs.map((blog) => (
                  <div key={blog.id} className="w-full flex-shrink-0 h-full">
                    <div className="bg-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row h-full cursor-pointer">
                      <div className="md:order-2 md:w-[45%] h-48 md:h-full">
                        <img className="w-full h-full object-cover" src={blog.image} alt={blog.title} />
                      </div>
                      <div className="flex-1 p-6 md:p-10 flex flex-col justify-between overflow-hidden md:order-1">
                        <div className="space-y-2 md:space-y-4 overflow-hidden">
                          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-['Bricolage Grotesque'] leading-tight line-clamp-2 md:line-clamp-none">
                            {blog.title}
                          </h2>
                          <p className="text-[#dfdfd1] text-sm md:text-base font-normal font-['Onest'] leading-normal line-clamp-3 md:line-clamp-none">
                            {blog.content}
                          </p>
                        </div>
                        <p className="text-[#dfdfd1] text-sm md:text-base font-normal font-['Onest'] leading-normal mt-2">
                          {blog.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Carousel indicators */}
            <div className="absolute -bottom-5 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {featuredBlogs.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentBlogIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  onClick={() => setCurrentBlogIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-32">
            {posts.map((post, index) => (
              <div
                key={index}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
              >
                <BlogCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  imageUrl={post.imageUrl}
                  date={post.date}
                />
              </div>
            ))}
          </div>
          {loading && <BlogLoadingIndicator />}
          {!hasMore && (
            <div className="text-center my-16">
              <p className="text-lg font-['Onest']">No more Blog posts</p>
            </div>
          )}
        </main>
      </div>

    </div>
  )
}

export default BlogPage
