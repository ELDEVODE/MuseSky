import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { AccountSettings, CloudPush, Dashbaord, Logout, MyCollections, PublicProfile, Wallet04 } from "../assets/svg";
import { motion, AnimatePresence } from "framer-motion";
import { defaultUser, Logo } from "../assets/images";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/muse_sky_backend/muse_sky_backend.did.js";
import { toast } from "react-toastify";

// default constants for authentication
const days = BigInt(1);
const hours = BigInt(24);
const nanoSeconds = BigInt(3600000000000);

const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic" ||
        process.env.DFX_NETWORK === "playground"
        ? "https://identity.ic0.app"
        : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943#authorize",
    maxTimeToLive: days * hours * nanoSeconds,
  },
};

const toastStyle = {
  background: "linear-gradient(to right, #ffa500, #ffc966)",
  color: "#2a2a2a",
  fontFamily: "Archivo, sans-serif",
  fontWeight: "semibold",
  borderRadius: "4px",
  padding: "16px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

function Navbar() {
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [authActor, setAuthActor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [principalId, setPrincipalId] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasBackground, setHasBackground] = useState(false)
  const prevScrollPos = useRef(0)
  const navRef = useRef(null)
  const navigate = useNavigate();

  // Add this line to get the current location
  const location = useLocation();

  // Add this function to check if a route is active
  const isRouteActive = (path) => {
    if (path === ROUTES.HOME) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    initAuth();
  }, []);

  async function initAuth() {
    try {
      const client = await AuthClient.create(defaultOptions.createOptions);
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        await handleAuthenticated(client);
      }
    } catch (error) {
      console.error("Authentication error", error);
      toast.error("Error initializing authentication: " + error.message, {
        style: toastStyle,
      });
    }
  }

  async function handleAuthenticated(client) {
    try {
      const identity = await client.getIdentity();
      setIdentity(identity);
      setIsAuthenticated(true);

      const principal = identity.getPrincipal();
      const principalIdFull = principal.toString();
      setPrincipalId(principalIdFull);

      const agent = new HttpAgent({ identity });
      if (process.env.NODE_ENV !== "production") {
        await agent.fetchRootKey().catch(console.error);
      }

      const newAuthActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: process.env.CANISTER_ID_MUSE_SKY_BACKEND,
      });

      setAuthActor(newAuthActor);

      toast.success("Authenticated successfully", { style: toastStyle });
    } catch (error) {
      console.error("Authentication error", error);
      toast.error("Error handling authentication: " + error.message, {
        style: toastStyle,
      });
    }
  }

  async function handleLogin() {
    try {
      await authClient.login({
        ...defaultOptions.loginOptions,
        onSuccess: () => {
          handleAuthenticated(authClient);
        },
      });
    } catch (error) {
      console.error("Login error", error);
      toast.error("Error logging in: " + error.message, { style: toastStyle });
    }
  }

  async function handleLogout() {
    try {
      await authClient.logout();
      setIdentity(null);
      setAuthActor(null);
      setIsAuthenticated(false);
      setPrincipalId("");
      toast.success("Logged out successfully", { style: toastStyle });
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Error logging out: " + error.message), { style: toastStyle };
    }
  }

  function truncatePrincipalId(id) {
    if (id.length > 10) {
      return `${id.slice(0, 5)}...${id.slice(-5)}`;
    }
    return id;
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }

  const handleMenuItemClick = (action) => {
    if (action === 'auth') {
      if (isAuthenticated) {
        handleLogout();
      } else {
        handleLogin();
      }
    }
    setIsMenuOpen(false);
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

  const ProfileModal = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`absolute top-full right-0 mt-2`}
    >
      <div className={`relative w-[220px] p-3 bg-[#1f1f1f] rounded-lg border border-[#ffc252] flex-col justify-center items-center gap-3 inline-flex`}>
        {/* Triangle pointer */}
        <div className="absolute -top-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#ffc252]"></div>

        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <img src={defaultUser} className="w-[30px] h-[30px] rounded-full" />
          <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
            <div className="self-stretch text-white text-sm font-medium font-['Onest'] underline capitalize leading-snug">Edit Profile</div>
            <div className="self-stretch text-[#ffd166] text-xs font-normal font-['Onest'] leading-snug">{truncatePrincipalId(principalId)}</div>
          </div>
        </div>
        <button
          className="self-stretch px-3 py-1.5 bg-[#ffc252] rounded-lg justify-center items-center gap-2 inline-flex"
          onClick={() => navigate(`/ranodomId/collections/create`)}
        >
          <img src={CloudPush} alt="" />
          <div className="text-[#070134] text-xs font-semibold font-['Onest'] leading-relaxed">Create Collection</div>
        </button>
        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
          {[
            {
              text: "Dashboard", icon: Dashbaord, onClick: () => navigate('randomId/collections')
            },
            {
              text: "Public Profile", icon: PublicProfile
            },
            {
              text: "My Collections", icon: MyCollections, onClick: () => navigate('randomId/collections')
            },
            {
              text: "Account Setting", icon: AccountSettings
            },
            {
              text: "Logout", icon: Logout, onClick: handleLogout
            },
          ].map((item, index) => (
            <div key={index} className="self-stretch flex-col justify-start items-start flex">
              {index > 0 && <div className="h-px w-full bg-[#6b6785] my-0.5" />}
              <button
                onClick={item.onClick}
                className="self-stretch justify-center items-center gap-2 inline-flex hover:bg-[#2a2a2a] w-full p-1 rounded"
              >
                <div className="w-4 h-4 flex items-center justify-center text-xs"><img src={item.icon} /></div>
                <div className="grow shrink flex jutify-start basis-0 text-[#e6e6eb] text-xs font-medium font-['Onest'] leading-relaxed">{item.text}</div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div >
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${hasBackground ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      <div className="relative h-14 py-1 px-6 md:px-2 rounded-lg flex justify-between items-center w-full max-w-6xl mx-auto my-1">
        <Link to={ROUTES.HOME}>
          <img className="h-[40px]" src={Logo} alt="MuseSky Logo" />
        </Link>

        {/* Desktop Menu */}
        <motion.div
          className="hidden md:flex px-6 py-2 bg-white/20 rounded-lg border border-[#ffc966] backdrop-blur-[15px] items-center gap-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { to: ROUTES.HOME, text: "Home" },
            { to: ROUTES.COLLECTION, text: "Collection" },
            { to: ROUTES.EXPLORE, text: "Explore" },
            { to: ROUTES.BLOG, text: "Blog" },
          ].map((item) => (
            <motion.div
              key={item.text}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to={item.to}
                className={`text-sm font-medium font-['Onest'] transition-all duration-300 ${isRouteActive(item.to)
                  ? "text-white font-semibold"
                  : "text-[#a5a5a5] hover:text-white"
                  }`}
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
                  ].map((item) => (
                    <Link
                      key={item.text}
                      to={item.to}
                      className={`text-sm font-medium font-onest transition-all duration-300 ${isRouteActive(item.to)
                        ? "text-white font-semibold"
                        : "text-[#a5a5a5] hover:text-white"
                        }`}
                      onClick={toggleMenu}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => handleMenuItemClick('auth')}
                  className="mt-6 px-4 py-2 bg-gradient-to-r from-[#ffa500] to-[#ffc966] rounded-md border border-[#ffc252] backdrop-blur-[12.63px] flex items-center justify-center gap-2 w-full"
                >
                  <span className="text-[#2a2a2a] text-xs font-medium font-['Onest']">
                    {isAuthenticated ? truncatePrincipalId(principalId) : "Login with Internet Identity"}
                  </span>
                  <img src={Wallet04} alt="Internet Identity" className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Login Button or Authenticated Section */}
        {isAuthenticated ? (
          <div className="h-[45px] justify-center items-center gap-6 hidden md:inline-flex">
            <div className="w-6 h-6 relative">
              <div className="w-6 h-6 left-0 top-0 absolute justify-center items-center inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path d="M5.26855 10.1064C5.26731 9.2169 5.44213 8.33595 5.78294 7.51434C6.12375 6.69273 6.62381 5.9467 7.25429 5.31925C7.88476 4.69179 8.6332 4.19533 9.45644 3.85848C10.2797 3.52163 11.1615 3.35105 12.0509 3.35658C15.7625 3.38417 18.7312 6.4692 18.7312 10.1911V10.8564C18.7312 14.2141 19.4337 16.1625 20.0524 17.2275C20.1191 17.3413 20.1546 17.4706 20.1553 17.6025C20.156 17.7343 20.1219 17.8641 20.0565 17.9786C19.991 18.0931 19.8966 18.1883 19.7826 18.2546C19.6686 18.3209 19.5392 18.3561 19.4073 18.3564H4.59173C4.45985 18.356 4.33038 18.3209 4.2164 18.2546C4.10242 18.1882 4.00795 18.093 3.94252 17.9785C3.8771 17.864 3.84303 17.7342 3.84376 17.6023C3.84449 17.4704 3.87999 17.3411 3.94667 17.2273C4.56573 16.1623 5.26855 14.2139 5.26855 10.8564L5.26855 10.1064Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9 18.3564V19.1064C9 19.9021 9.31607 20.6652 9.87868 21.2278C10.4413 21.7904 11.2044 22.1064 12 22.1064C12.7956 22.1064 13.5587 21.7904 14.1213 21.2278C14.6839 20.6652 15 19.9021 15 19.1064V18.3564" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className="w-2 h-2 left-[15px] top-[1px] absolute bg-[#ffc252] rounded-full" />
            </div>
            <div className="w-6 h-6 relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 5.85645C5.11739 5.85645 4.99021 5.90912 4.89645 6.00289C4.80268 6.09666 4.75 6.22384 4.75 6.35645C4.75 6.48905 4.80268 6.61623 4.89645 6.71C4.99022 6.80377 5.11739 6.85645 5.25 6.85645H20.25C20.7141 6.85645 21.1592 7.04082 21.4874 7.36901C21.8156 7.6972 22 8.14232 22 8.60645V19.1064C22 19.5706 21.8156 20.0157 21.4874 20.3439C21.1592 20.6721 20.7141 20.8564 20.25 20.8564H5.25C4.58696 20.8564 3.95107 20.5931 3.48223 20.1242C3.01339 19.6554 2.75 19.0195 2.75 18.3564V6.35645C2.75 5.6934 3.01339 5.05752 3.48223 4.58868C3.95107 4.11984 4.58696 3.85645 5.25 3.85645H18C18.5523 3.85645 19 4.30416 19 4.85645C19 5.40873 18.5523 5.85645 18 5.85645H5.25ZM4.75 8.80595V18.3564C4.75 18.4891 4.80268 18.6162 4.89645 18.71C4.99022 18.8038 5.11739 18.8564 5.25 18.8564H20V8.85645H5.25C5.08079 8.85645 4.91335 8.83929 4.75 8.80595Z" fill="white" />
                <path d="M16.5 15.3564C17.3284 15.3564 18 14.6849 18 13.8564C18 13.028 17.3284 12.3564 16.5 12.3564C15.6716 12.3564 15 13.028 15 13.8564C15 14.6849 15.6716 15.3564 16.5 15.3564Z" fill="white" />
              </svg>
            </div>
            <div
              className="w-[35px] h-[35px] justify-center items-center flex relative"
              onMouseEnter={() => setIsProfileModalOpen(true)}
              onMouseLeave={() => setIsProfileModalOpen(false)}
            >
              <img className="w-full h-full rounded-full border" src={defaultUser} alt="User avatar" />
              {/* <AnimatePresence> */}
              {isProfileModalOpen && <ProfileModal />}
              {/* </AnimatePresence> */}
            </div>
          </div>
        ) : (
          <motion.button
            onClick={handleLogin}
            className="px-4 py-2 bg-gradient-to-r from-[#ffa500] to-[#ffc966] hidden md:flex rounded-md border border-[#ffc252] backdrop-blur-[12.63px] items-center gap-2 group overflow-hidden"
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative overflow-hidden h-5 w-[180px]">
              <motion.div
                className="flex flex-col"
                initial={{ y: 0 }}
                whileHover={{ y: "-50%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <span className="flex items-center justify-center text-[#2a2a2a] text-sm font-medium font-['Onest'] whitespace-nowrap h-5">
                  Login with Internet Identity
                </span>
                <span className="flex items-center justify-center text-[#2a2a2a] text-sm font-medium font-['Onest'] whitespace-nowrap h-5">
                  Connect Now
                </span>
              </motion.div>
            </div>
            <div className="w-4 h-4 relative wallet-icon">
              <img src={Wallet04} alt="Internet Identity" />
            </div>
          </motion.button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
