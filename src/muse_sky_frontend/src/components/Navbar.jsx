import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { Wallet04 } from '../assets/svg'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '../assets/images'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasBackground, setHasBackground] = useState(false)
  const prevScrollPos = useRef(0)
  const navRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const navbar = navRef.current
      const navbarHeight = navbar ? navbar.offsetHeight : 0

      // Determine if we should show/hide the navbar
      setIsVisible(prevScrollPos.current > currentScrollPos || currentScrollPos < navbarHeight)

      // Determine if we should add background
      setHasBackground(currentScrollPos > navbarHeight)

      prevScrollPos.current = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${hasBackground ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      <div className="relative h-14 py-1 px-6 md:px-2 rounded-lg flex justify-between items-center w-full max-w-6xl mx-auto my-1">
        <Link to={ROUTES.HOME}>
          <img
            className="h-[40px]"
            src={Logo} alt="MuseSky Logo" />
        </Link>

        {/* Desktop Menu */}
        <motion.div
          className="hidden md:flex px-6 py-2 bg-white/20 rounded-lg border border-[#ffc966] backdrop-blur-[15px] items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { to: ROUTES.HOME, text: 'Home' },
            { to: ROUTES.COLLECTION, text: 'Collection' },
            { to: ROUTES.EXPLORE, text: 'Explore' },
            { to: ROUTES.BLOG, text: 'Blog' },
            { to: ROUTES.WALLET, text: 'Wallet' },
          ].map((item) => (
            <motion.div
              key={item.text}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to={item.to}
                className="text-[#a5a5a5] text-xs font-medium font-onest transition-all duration-300 hover:text-white"
              >
                {item.text}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed h-[100vh] inset-0 bg-black/80 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`bg-[#1a1a1a] h-full w-64 p-5 absolute z-12 right-0 ${hasBackground ? 'backdrop-blur-md' : ''
                  }`}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
              >
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 text-white focus:outline-none"
                  onClick={toggleMenu}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex flex-col gap-4 mt-12">
                  {[
                    { to: ROUTES.HOME, text: 'Home' },
                    { to: ROUTES.COLLECTION, text: 'Collection' },
                    { to: ROUTES.EXPLORE, text: 'Explore' },
                    { to: ROUTES.BLOG, text: 'Blog' },
                    { to: ROUTES.WALLET, text: 'Wallet' },
                  ].map((item) => (
                    <Link
                      key={item.text}
                      to={item.to}
                      className="text-[#a5a5a5] text-sm font-medium font-onest transition-all duration-300 hover:text-white"
                      onClick={toggleMenu}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
                <Link
                  to={ROUTES.AUTH}
                  className="mt-6 px-4 py-2 bg-gradient-to-r from-[#ffa500] to-[#ffc966] rounded-md border border-[#ffc252] backdrop-blur-[12.63px] flex items-center justify-center gap-2"
                  onClick={toggleMenu}
                >
                  <span className="text-[#2a2a2a] text-sm font-semibold font-archivo">Login</span>
                  <img src={Wallet04} alt="Internet Identity" className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Button */}
        <Link to={ROUTES.AUTH} className="hidden md:flex px-4 py-2 bg-gradient-to-r from-[#ffa500] to-[#ffc966] rounded-md border border-[#ffc252] backdrop-blur-[12.63px] items-center gap-2 group">
          <div className="relative overflow-hidden h-5 w-[180px]">
            <motion.div
              className="flex flex-col"
              initial={{ y: 0 }}
              whileHover={{ y: "-50%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <span className="flex items-center justify-center text-[#2a2a2a] text-xs font-semibold font-archivo whitespace-nowrap h-5">
                Login with Internet Identity
              </span>
              <span className="flex items-center justify-center text-[#2a2a2a] text-xs font-semibold font-archivo whitespace-nowrap h-5">
                Connect Now
              </span>
            </motion.div>
          </div>
          <div
            className="w-4 h-4 relative wallet-icon"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <img src={Wallet04} alt="Internet Identity" />
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar