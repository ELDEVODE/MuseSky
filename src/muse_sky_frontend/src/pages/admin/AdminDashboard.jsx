import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { FaBlog, FaUsers, FaChartBar, FaCog, FaComments, FaTags, FaImage, FaList, FaPenFancy } from 'react-icons/fa';

const AdminDashboard = () => {
  const dashboardItems = [
    { title: 'Posts', description: 'Manage all blog posts', icon: FaBlog, route: ROUTES.ADMIN_BLOG_POSTS, color: 'from-blue-400 to-blue-600' },
    { title: 'Categories', description: 'Organize content categories', icon: FaList, route: ROUTES.ADMIN_CATEGORIES, color: 'from-green-400 to-green-600' },
    { title: 'Tags', description: 'Manage post tags', icon: FaTags, route: ROUTES.ADMIN_TAGS, color: 'from-yellow-400 to-yellow-600' },
    { title: 'Comments', description: 'Moderate user comments', icon: FaComments, route: ROUTES.ADMIN_COMMENTS, color: 'from-red-400 to-red-600' },
    { title: 'Media', description: 'Manage images and files', icon: FaImage, route: ROUTES.ADMIN_MEDIA, color: 'from-purple-400 to-purple-600' },
    { title: 'Users', description: 'Manage user accounts', icon: FaUsers, route: ROUTES.ADMIN_USERS, color: 'from-indigo-400 to-indigo-600' },
    { title: 'Analytics', description: 'View site statistics', icon: FaChartBar, route: ROUTES.ADMIN_ANALYTICS, color: 'from-pink-400 to-pink-600' },
    { title: 'Settings', description: 'Configure site settings', icon: FaCog, route: ROUTES.ADMIN_SETTINGS, color: 'from-gray-400 to-gray-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-['Bricolage Grotesque'] text-gray-800 mb-4 sm:mb-0">Blog Admin Dashboard</h1>
        <Link
          to={ROUTES.ADMIN_CREATE_POST}
          className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <FaPenFancy className="mr-2 group-hover:animate-bounce" />
          <span className="relative">
            <span className="group-hover:opacity-0 transition-opacity duration-300">New Post</span>
            <span className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Create!</span>
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {dashboardItems.map((item, index) => (
          <Link key={index} to={item.route} className="block h-full">
            <div className={`bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 h-full flex flex-col`}>
              <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 rounded-full bg-gradient-to-r ${item.color}`}>
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold font-['Bricolage Grotesque'] text-gray-800 mb-1 sm:mb-2">{item.title}</h2>
              <p className="text-gray-600 font-['Onest'] text-xs sm:text-sm flex-grow">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
