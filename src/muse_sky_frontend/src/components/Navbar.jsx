import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { Wallet04 } from '../assets/svg'
import { motion } from 'framer-motion'
import { Logo } from '../assets/images'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-center w-full transition-all duration-300">
      <div className="h-16 py-2 px-3 rounded-xl flex justify-between items-center w-full max-w-6xl m-[16px]">
        {/* <div className="px-4 py-2 bg-gradient-to-r from-[#ffa500] to-[#ffc966] rounded-md border border-[#ffc252] backdrop-blur-[12.63px] flex items-center gap-2"> */}
        <Link to={ROUTES.HOME}>
          <img
            className="h-[50px]"
            src={Logo} alt="" />
        </Link>
        {/* </div> */}
        <motion.div
          className="px-10 py-3 bg-white/20 rounded-xl border border-[#ffc966] backdrop-blur-[15px] flex items-center gap-4"
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
                className="text-[#a5a5a5] text-xs font-medium font-['Onest'] transition-all duration-300 hover:text-white"
              >
                {item.text}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <Link to={ROUTES.AUTH} className="px-4 py-2 bg-gradient-to-r from-[#ffa500] to-[#ffc966] rounded-md border border-[#ffc252] backdrop-blur-[12.63px] flex items-center gap-2 group">
          <div className="relative overflow-hidden h-5 w-[180px]">
            <motion.div
              className="flex flex-col"
              initial={{ y: 0 }}
              whileHover={{ y: "-50%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <span className="flex items-center justify-center text-[#2a2a2a] text-sm font-semibold font-['Archivo'] whitespace-nowrap h-5">
                Login with Internet Identity
              </span>
              <span className="flex items-center justify-center text-[#2a2a2a] text-sm font-semibold font-['Archivo'] whitespace-nowrap h-5">
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