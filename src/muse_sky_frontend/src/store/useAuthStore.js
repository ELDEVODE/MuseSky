import {create} from 'zustand';
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

const useAuthStore = create((set, get) => ({
  authClient: null,
  isAuthenticated: false,
  initializeAuth: async () => {
    const authClient = await AuthClient.create(defaultOptions.createOptions);
    set({ authClient });
  },
  login: async () => {
    const authClient = await AuthClient.create(defaultOptions.createOptions);
    await authClient.login(defaultOptions.loginOptions);
    set({ authClient, isAuthenticated: authClient.isAuthenticated() });
  },
  logout: async () => {
    const { authClient } = get();
    await authClient.logout();
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;