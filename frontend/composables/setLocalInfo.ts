import { useGeneralStore } from "@/store/generalStore";

export const setLocalInfo = (token: string, username:string) => {
  if (process.client) {
    if (token != null || username != null) {
      
      const generalStore = useGeneralStore();
      generalStore.isAuthenticated = true;
      generalStore.username = username;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    }
  
  } else {
    console.log("was lied to, not token was give in 'setlocalinfo")
  }
};
