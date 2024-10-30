import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogPosts } from "../constants/testData";
import { CoolButton } from "../components";
import BlogCarousel from "../components/BlogCarousel";
import { ROUTES } from "../constants/routes";

const BlogPost2 = ({ post: propPost, isPreview = false }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const post =
    propPost || blogPosts.find((post) => post.id === parseInt(postId));

  const shareUrl = isPreview ? "" : window.location.href;
  const shareText = post ? post.title : "Check out this blog post!";

  const shareOnSocialMedia = (platform) => {
    let url;
    switch (platform) {
      case "x":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(shareText)}`;
        break;
      default:
        return;
    }
    window.open(url, "_blank");
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-black text-white">
      <div className="h-auto pt-[80px] flex-col justify-start items-center gap-[20px] mt-[100px] inline-flex w-full px-4 sm:px-0">
        <div className="flex-col justify-start items-center gap-[40px] flex">
          <div className="self-stretch flex-col justify-start items-start gap-3 flex">
            <h1 className="self-stretch text-center text-white text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Bricolage Grotesque'] uppercase leading-tight sm:leading-[54px]">
              {post.title}
            </h1>
            <p className="self-stretch text-center text-[#dfdfd1] text-sm font-normal font-['Onest'] leading-normal">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        {post.excerpt && (
          <div className="w-full sm:max-w-[960px] mb-6">
            <p className="text-lg text-[#dfdfd1] italic border-l-4 border-[#ffa500] pl-4">
              {post.excerpt}
            </p>
          </div>
        )}
        <img
          className="w-full h-auto sm:max-w-[960px] sm:max-h-[460px] relative rounded-lg object-cover"
          src={post.imageUrl}
          alt={post.title}
        />
        <div className="w-full sm:max-w-[960px] h-[0px] border-b border-white/50"></div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 py-8">
        <div className="prose prose-invert max-w-none custom-blog-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {!isPreview && (
          <div className="my-12 p-4 bg-gradient-to-r from-[#ffa500] to-[#ffc966] border-2 border-[#ffc252] shadow-lg rounded-sm">
            <div className="flex justify-between items-center">
              <div className="text-black text-base font-medium font-['Onest']">
                Like what you see? Share with a friend.
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => shareOnSocialMedia("x")}
                  className="text-black hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  onClick={() => shareOnSocialMedia("facebook")}
                  className="text-black hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </button>
                <button
                  onClick={() => shareOnSocialMedia("linkedin")}
                  className="text-black hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isPreview && (
        <div className="max-w-[100vw] px-6 py-[75px] md:py-[100px] relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="mb-[50px] flex flex-col md:flex-row justify-between items-start w-full">
              <div className="w-full md:w-[768px] flex-col justify-start items-start gap-5 inline-flex mb-6 md:mb-0">
                <div className="self-stretch text-white text-4xl md:text-5xl font-semibold font-bricolage">
                  More Blogs
                </div>
                <div className="self-stretch text-[#dfdfd1] text-lg md:text-base font-normal font-onest leading-[30px]">
                  Explore more articles from our team.
                </div>
              </div>
              <div className="flex justify-center md:justify-end w-full hidden md:flex relative">
                <CoolButton onClick={() => navigate(ROUTES.BLOG)}>
                  View All Posts
                </CoolButton>
              </div>
            </div>
            <BlogCarousel posts={blogPosts.filter((p) => p.id !== post.id)} />
            <div className="flex justify-center md:justify-end mt-5 w-full flex md:hidden relative">
              <CoolButton onClick={() => navigate(ROUTES.BLOG)}>
                View All Posts
              </CoolButton>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-blog-content {
          color: #dfdfd1;
          font-family: "Onest", sans-serif;
          line-height: 1.6;
          font-size: 18px;
        }
        .custom-blog-content h1,
        .custom-blog-content h2,
        .custom-blog-content h3,
        .custom-blog-content h4,
        .custom-blog-content h5,
        .custom-blog-content h6 {
          color: #ffffff;
          font-family: "Bricolage Grotesque", sans-serif;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          line-height: 1.2;
        }
        .custom-blog-content h1 {
          font-size: 2.5em;
        }
        .custom-blog-content h2 {
          font-size: 2em;
        }
        .custom-blog-content h3 {
          font-size: 1.75em;
        }
        .custom-blog-content h4 {
          font-size: 1.5em;
        }
        .custom-blog-content h5 {
          font-size: 1.25em;
        }
        .custom-blog-content h6 {
          font-size: 1em;
        }
        .custom-blog-content p {
          margin-bottom: 1.5em;
        }
        .custom-blog-content a {
          color: #ffa500;
          text-decoration: underline;
        }
        .custom-blog-content a:hover {
          color: #ffc966;
        }
        .custom-blog-content ul,
        .custom-blog-content ol {
          margin-left: 1.5em;
          margin-bottom: 1.5em;
          padding-left: 1em;
        }
        .custom-blog-content li {
          margin-bottom: 0.5em;
        }
        .custom-blog-content blockquote {
          border-left: 4px solid #ffa500;
          padding-left: 1em;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #ffc966;
        }
        .custom-blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5em 0;
        }
        .custom-blog-content pre {
          background-color: #1a1a1a;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .custom-blog-content code {
          font-family: "Courier New", Courier, monospace;
          background-color: #1a1a1a;
          padding: 0.2em 0.4em;
          border-radius: 3px;
        }
        .custom-blog-content > *:first-child {
          margin-top: 0;
        }
        .custom-blog-content > *:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default BlogPost2;
