
/**
 * Takes the arguments and sets them as info in localStorage
 * 
 * @param token - The string that is the token
 * @param username - The string that is username
 * 
 * Has no return
 */
export const setTokenAndUsername = (token: string, username:string) => {
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
