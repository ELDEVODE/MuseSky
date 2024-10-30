import React, { useState, useEffect, useCallback, useRef } from "react";
import { useListPosts } from "../store/BackendCallBlog";
import BlogCard from "../components/BlogCard";
import BlogLoadingIndicator from "../components/BlogLoadingIndicator";
import { TwinkleStars } from "../components";
import { convertTimestampToNormalTime } from "../store/BackendCall";

function BlogPage() {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { data: posts = [], isLoading, isError } = useListPosts();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlogIndex((prevIndex) =>
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [posts]);

  const loadMorePosts = useCallback(() => {
    setLoading(true);
    // Simulating an API call with setTimeout
    setTimeout(() => {
      const newPosts = posts.slice((page - 1) * 9, page * 9);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
      if (newPosts.length < 9) {
        setHasMore(false);
      }
    }, 3000);
  }, [page, posts]);

  useEffect(() => {
    loadMorePosts();
  }, [posts]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePosts]
  );

  if (isLoading) {
    return <BlogLoadingIndicator />;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen text-white relative flex flex-col items-center justify-center">
        <h2 className="text-4xl font-['Bricolage Grotesque'] font-bold mb-4">
          No Blog Posts Available
        </h2>
        <p className="text-lg text-[#dfdfd1] font-['Onest']">
          Check back soon for new updates.
        </p>
      </div>
    );
  }

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
                {posts.map((blog) => (
                  <div key={blog.id} className="w-full flex-shrink-0 h-full">
                    <div className="bg-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row h-full cursor-pointer">
                      <div className="md:order-2 md:w-[45%] h-48 md:h-full">
                        <img
                          className="w-full h-full object-cover"
                          src={blog.image_link}
                          alt={blog.title}
                        />
                      </div>
                      <div className="flex-1 p-6 md:p-10 flex flex-col justify-between overflow-hidden md:order-1">
                        <div className="space-y-2 md:space-y-4 overflow-hidden">
                          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-['Bricolage Grotesque'] leading-tight line-clamp-2 md:line-clamp-none">
                            {blog.title}
                          </h2>
                          <p className="text-[#dfdfd1] flex text-sm md:text-base font-normal font-['Onest'] leading-normal line-clamp-3 md:line-clamp-none">
                            <div
                              dangerouslySetInnerHTML={{ __html: blog.excerpt }}
                            />{" "}
                            ........
                          </p>
                        </div>
                        <p className="text-[#dfdfd1] text-sm md:text-base font-normal font-['Onest'] leading-normal mt-2">
                          {convertTimestampToNormalTime(blog.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Carousel indicators */}
            <div className="absolute -bottom-5 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentBlogIndex ? "bg-white" : "bg-white/50"
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
                  content={post.excerpt}
                  imageUrl={post.image_link}
                  date={convertTimestampToNormalTime(post.date)}
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
  );
}

export default BlogPage;
