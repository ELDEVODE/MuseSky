import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { blogPosts } from "../../constants/testData";
import { FaPenFancy, FaSearch, FaFilter } from "react-icons/fa";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { useListPosts } from "../../store/BackendCallBlog";
import { convertTimestampToNormalTime } from "../../store/BackendCall";

const POSTS_PER_PAGE = 10;

const BlogPostList = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    date: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: posts, refetch } = useListPosts();

  useEffect(() => {
    const filtered = blogPosts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filters.status === "all" || post.status === filters.status;
      const matchesCategory =
        filters.category === "all" || post.category === filters.category;
      const matchesDate =
        filters.date === "all" || filterByDate(post.date, filters.date);
      return matchesSearch && matchesStatus && matchesCategory && matchesDate;
    });
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters]);

  //refetch with useEffect
  useEffect(() => {
    refetch();
  }, [posts]);

  const filterByDate = (postDate, filterDate) => {
    const date = new Date(postDate);
    const now = new Date();
    switch (filterDate) {
      case "lastWeek":
        return date >= new Date(now.setDate(now.getDate() - 7));
      case "lastMonth":
        return date >= new Date(now.setMonth(now.getMonth() - 1));
      case "lastYear":
        return date >= new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return true;
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Implement delete logic here
    console.log("Deleting post:", postToDelete);
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50 min-h-screen">
      {console.log("posts", posts)}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Blog Posts
          </h1>
          <Link
            to={ROUTES.ADMIN_CREATE_POST}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPenFancy className="mr-2 -ml-1 h-5 w-5" />
            Create New Post
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="lastWeek">Last Week</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastYear">Last Year</option>
                </select>
              </div>
            </div>
          </div>
          {console.log(posts)}

          {posts?.length === 0 ? (
            <div className="px-4 py-5 sm:p-6">
              <p className="text-center text-gray-500">No posts available.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {posts?.map((post) => (
                <li
                  key={post.id}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-lg font-semibold text-gray-900 truncate">
                        {post.title}
                      </p>
                      <p className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{convertTimestampToNormalTime(post.date)}</span>
                        <span className="mx-2">&middot;</span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center space-x-2">
                      <button className="p-2 text-indigo-600 hover:text-indigo-900 transition-colors duration-200">
                        <HiOutlineEye className="h-5 w-5" />
                      </button>
                      <Link
                        to={ROUTES.ADMIN_EDIT_POST.replace(":postId", post.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <HiOutlinePencil className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(post)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <HiOutlineTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstPost + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastPost, filteredPosts.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredPosts.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === number + 1
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {number + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <HiChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteDialogOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FaTrashAlt
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Delete post
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the post "
                      {postToDelete?.title}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
