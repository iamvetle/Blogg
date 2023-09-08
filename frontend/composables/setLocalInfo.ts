import { useGeneralStore } from "@/store/generalStore";

export const setLocalInfo = (token: string, username:string) => {
  if (process.client) {
    if (token != null || token != null) {
      
      const store = useGeneralStore();
      store.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    }
  
  } else {
    console.log("was lied to, not token was give in 'setlocalinfo")
  }
};
