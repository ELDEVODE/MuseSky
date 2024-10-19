import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Logo } from '../assets/images';
import { RiDashboardLine, RiArticleLine, RiUserLine, RiSettings4Line, RiMenuLine, RiCloseLine } from 'react-icons/ri';

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => {
    if (path === ROUTES.ADMIN_DASHBOARD) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { icon: RiDashboardLine, text: 'Dashboard', route: ROUTES.ADMIN_DASHBOARD },
    { icon: RiArticleLine, text: 'Blog Posts', route: ROUTES.ADMIN_BLOG_POSTS },
    // { icon: RiUserLine, text: 'Users', route: ROUTES.ADMIN_USERS },
    // { icon: RiSettings4Line, text: 'Settings', route: ROUTES.ADMIN_SETTINGS },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800 md:flex-row">
      {/* Mobile header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center md:hidden">
        <Link to={ROUTES.ADMIN_DASHBOARD}>
          <div className="flex items-center">
            <img src={Logo} alt="MuseSky Logo" className="h-8 mr-3" />
            <h1 className="text-xl font-bold font-['Bricolage Grotesque']" style={{ color: '#FFC252' }}>MuseSky</h1>
          </div>
        </Link>
        <button onClick={toggleSidebar} className="text-2xl">
          {isSidebarOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </header>

      {/* Sidebar */}
      <div className={`w-64 bg-gray-900 shadow-lg flex-shrink-0 flex flex-col md:relative absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-10`}>
        <div className="p-6 border-b border-gray-800 hidden md:block">
          <div className="flex items-center">
            <img src={Logo} alt="MuseSky Logo" className="h-8 mr-3" />
            <h1 className="text-xl font-bold font-['Bricolage Grotesque']" style={{ color: '#FFC252' }}>MuseSky</h1>
          </div>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.route}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.route)
                    ? 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  style={isActive(item.route) ? {
                    backgroundColor: 'rgba(255, 194, 82, 0.1)',
                    color: '#FFD280',
                    borderRight: '4px solid #FFB01F'
                  } : {}}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-3 text-xl" />
                  <span className="font-medium">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
