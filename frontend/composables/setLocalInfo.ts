import { useGeneralStore } from "@/store/generalStore";

export const setLocalInfo = (token: string, username:string) => {
  if (process.client) {
    if (token != null || username != null) {
      
      const store = useGeneralStore();
      store.isAuthenticated = true;
      store.username = username;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    }
  
  } else {
    console.log("was lied to, not token was give in 'setlocalinfo")
  }
};
