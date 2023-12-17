/**
 * The function compares the provided username to the username (of the logged in user) saved in localStorage
 * 
 * @param username - The username that is going to be compared
 * @returns - True og false, (or null if there was no username in localstorage)
 */
export const checkIfLoggedInUser = (username: string): boolean | null => {
    const authStore = useAuthStore()

    if (authStore.username === username) {
        /** 
         * TODO I need to make it so that users can only have lowercase usernames  
         */
        return true
    } else {
        // console.log("IS not THE SAME")
        return false
    }
}