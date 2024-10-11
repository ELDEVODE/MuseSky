import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Wallet04 } from "../assets/svg";
import { motion } from "framer-motion";
import { Logo } from "../assets/images";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principalId, setPrincipalId] = useState("");

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

  return (
    <nav className="sticky top-0 z-50 flex justify-center w-full transition-all duration-300">
      <div className="h-16 py-2 px-3 rounded-xl flex justify-between items-center w-full max-w-6xl m-[16px]">
        <Link to={ROUTES.HOME}>
          <img className="h-[50px]" src={Logo} alt="" />
        </Link>
        <motion.div
          className="px-10 py-3 bg-white/20 rounded-xl border border-[#ffc966] backdrop-blur-[15px] flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { to: ROUTES.HOME, text: "Home" },
            { to: ROUTES.COLLECTION, text: "Collection" },
            { to: ROUTES.EXPLORE, text: "Explore" },
            { to: ROUTES.BLOG, text: "Blog" },
            { to: ROUTES.WALLET, text: "Wallet" },
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
        <motion.button
          onClick={isAuthenticated ? handleLogout : handleLogin}
          className="px-4 py-2 bg-gradient-to-r from-[#ffa500] to-[#ffc966] rounded-md border border-[#ffc252] backdrop-blur-[12.63px] flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative overflow-hidden h-5 w-[180px]">
            <motion.div
              className="flex flex-col"
              initial={{ y: 0 }}
              whileHover={{ y: isAuthenticated ? "-50%" : "0%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <span className="flex items-center justify-center text-[#2a2a2a] text-sm font-semibold font-['Archivo'] whitespace-nowrap h-5">
                {isAuthenticated
                  ? truncatePrincipalId(principalId)
                  : "Login with Internet Identity"}
              </span>
              <span className="flex items-center justify-center text-[#2a2a2a] text-sm font-semibold font-['Archivo'] whitespace-nowrap h-5">
                {isAuthenticated ? "Logout" : "Connect Now"}
              </span>
            </motion.div>
          </div>
          <div className="w-4 h-4 relative wallet-icon">
            <img src={Wallet04} alt="Internet Identity" />
          </div>
        </motion.button>
      </div>
    </nav>
  );
}

export default Navbar;
