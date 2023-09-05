import { useGeneralStore } from "@/store/generalStore";

export const checkLocalToken = () => {
  if (process.client) {
    const token = localStorage.getItem("token");
    const store = useGeneralStore();

    token != null
      ? (store.isAuthenticated = true)
      : (store.isAuthenticated = false);
  }
};
