import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { coverBg, defaultUser } from '../../assets/images'
import { FaCheck, FaLink, FaMapMarkerAlt, FaEdit, FaCog, FaLayerGroup, FaHeart, FaUser, FaPlus, FaCaretDown, FaCaretUp } from 'react-icons/fa'
import BackgroundCircles from '../../components/BackgroundCircles';
import { TwinkleStars } from '../../components';
import CollectionGrid from '../../components/CollectionGrid';
import Pagination from '../../components/Pagination';
import { testCollections, testImages } from '../../testdata/collectionData';
import { ROUTES } from '../../constants/routes';

const MyCollections = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const collectionsPerPage = 12;

  const getCurrentPage = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    return Math.max(1, page);
  }, [location.search]);

  const currentPage = getCurrentPage();

  const totalPages = Math.ceil(testCollections.length / collectionsPerPage);

  const currentCollections = useMemo(() => {
    const indexOfLastCollection = currentPage * collectionsPerPage;
    const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage;
    return testCollections.slice(indexOfFirstCollection, indexOfLastCollection);
  }, [currentPage]);

  const handlePageChange = useCallback((pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      navigate(`?page=${pageNumber}`, { replace: true });
      window.scrollTo(0, 0);
    }
  }, [navigate, totalPages]);

  const getRandomImage = () => testImages[Math.floor(Math.random() * testImages.length)];

  return (
    <div className='min-h-screen'>
      {/* Banner section */}
      <div
        className="w-full mt-16 h-[300px] sm:h-[350px] md:h-[400px] flex justify-center items-center relative"
        style={{
          backgroundImage: `url(${coverBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="z-10 flex flex-col items-center gap-4 px-4 text-center">
          <div className="relative rounded-full">
            <img
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 border-white"
              src={defaultUser}
              alt="Profile"
            />
            <div className="absolute bottom-1 right-1 bg-[#ffc252] rounded-full p-1 border-2 border-[#2c2520]">
              <FaCheck className="text-white text-xs" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold font-['Bricolage Grotesque']">Bruno Bangnyfe</h2>
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
              <div className="p-1 bg-white/20 rounded-full">
                <FaLink className="text-white w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <span className="text-white font-['Onest']">0xc4c16a645i84fbuqb21a</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
              <div className="p-1 bg-white/20 rounded-full">
                <FaMapMarkerAlt className="text-white w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[#e6e6eb] font-['Onest']">Buenos Aires, Argentine</span>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button className="px-4 py-1.5 rounded-lg border-2 border-[#ffc252] text-white text-sm sm:text-base font-medium font-['Onest'] flex items-center gap-2 transition-all duration-300 hover:bg-[#ffc252] hover:text-[#2c2520] hover:shadow-lg">
              <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Edit Banner</span>
            </button>
            <button className="px-4 py-1.5 rounded-lg border-2 border-[#ffc252] text-white text-sm sm:text-base font-medium font-['Onest'] flex items-center gap-2 transition-all duration-300 hover:bg-[#ffc252] hover:text-[#2c2520] hover:shadow-lg">
              <FaCog className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="flex flex-col md:flex-row p-8 md:p-16 relative">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden w-full mb-4 flex flex-row justify-between items-center">
          <div className="text-[#9c99ae] text-base font-medium font-['Onest'] leading-relaxed">Menu</div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2  transition duration-200 flex items-center gap-2"
          >
            {/* <span className="text-sm font-medium">
              {isMobileMenuOpen ? 'Close' : 'Open'}
            </span> */}
            {isMobileMenuOpen ? (
              <FaCaretUp className="w-5 h-5 text-[#ffc252]" />
            ) : (
              <FaCaretDown className="w-5 h-5 text-[#ffc252]" />
            )}
          </button>
        </div>

        {/* Sidebar - now responsive */}
        <div className={`md:w-64 md:sticky md:top-8 md:self-start mb-12 ${isMobileMenuOpen ? 'block border-b pb-12 border-white/20' : 'hidden md:block'}`}>
          <div className="flex-col justify-start items-start gap-4 inline-flex">
            <div className="text-[#9c99ae] text-base font-medium font-['Onest'] leading-relaxed hidden md:inline-flex">Menu</div>
            <div className="flex-col justify-start items-start gap-6 flex">
              <MenuItem icon={<FaLayerGroup />} text="My Collections" active />
              <MenuItem icon={<FaHeart />} text="Favorites" />
              <MenuItem icon={<FaUser />} text="About Me" />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <div className="flex flex-col items-center gap-6">
            <div className="w-full flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-white text-2xl sm:text-3xl font-extrabold font-['Bricolage Grotesque'] leading-tight">My Collections</h1>
                <p className="text-[#ceccd6] text-sm sm:text-base font-['Onest'] leading-relaxed">{testCollections.length} Collection{testCollections.length !== 1 ? 's' : ''}</p>
              </div>

              {testCollections.length > 0 && (
                <button
                  className="group px-4 py-2 rounded-lg bg-[#ffc252] text-[#2c2520] text-md sm:text-base font-medium font-['Onest'] flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,194,82,0.5)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 active:scale-100"
                  onClick={() => { navigate(ROUTES.CREATE_COLLECTION) }}
                >
                  <FaPlus className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-90" />
                  <span>Create Collection</span>
                </button>
              )}
            </div>

            {/* Collection */}
            <div className="w-full flex items-center justify-center">
              {testCollections.length < 1 ? (
                <div className="rounded-xl border-2 border-[#ffc252] border-dashed flex items-center justify-center m-8 py-8 md:py-16 w-[80%] md:w-[60%]">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-8 h-8 relative">
                      <FaPlus className="text-white text-3xl" />
                    </div>
                    <div>
                      <h2 className="text-white text-lg sm:text-xl font-extrabold font-['Bricolage Grotesque'] leading-tight">No collection</h2>
                      <p className="text-white/20 text-sm sm:text-base font-light font-['Onest'] leading-snug">Create your first project</p>
                    </div>
                    <button
                      className="w-full p-3 bg-white/20 rounded-xl border-2 border-[#ffc966] backdrop-blur-[12.63px] text-[#ffc252] text-md sm:text-sm font-medium font-['Onest'] leading-7 transition-all duration-300 hover:bg-white/30 hover:text-white"
                      onClick={() => navigate(ROUTES.CREATE_COLLECTION)}
                    >
                      Create a new Collection
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  {/* Collection Grid */}
                  <div className="py-12 relative">
                    <CollectionGrid option2 collections={currentCollections.map(collection => ({
                      ...collection,
                      image: getRandomImage()
                    }))} />
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MenuItem = ({ icon, text, active = false }) => (
  <div className="flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-[#ffc252]">
    <div className="w-6 h-6 flex items-center justify-center">
      {React.cloneElement(icon, { className: `w-5 h-5 ${active ? 'text-[#ffc252]' : 'text-[#ceccd6]'}` })}
    </div>
    <div className={`text-base font-medium font-['Onest'] leading-relaxed ${active ? 'text-[#ffc252]' : 'text-[#ceccd6]'}`}>
      {text}
    </div>
  </div>
)

export default MyCollections
