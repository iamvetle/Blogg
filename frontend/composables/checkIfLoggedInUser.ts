/**
 * The function compares the provided username to the username (of the logged in user) saved in localStorage
 * 
 * @param username - The username that is going to be compared
 * @returns - True og false, (or null if there was no username in localstorage - but not supossed to happen)
 */
export const checkIfLoggedInUser = (username:string): boolean | null => {
    
    if (process.client) {
        const logged_in_user_username = localStorage.getItem("username")

        /** 
         * TODO I need to make it so that users can only have lowercase usernames  
         */
        if(logged_in_user_username) {
            if (logged_in_user_username === username) {
                console.log("IS THE SAME")
                return true
            } else {
                console.log("IS not THE SAME")
                return false
            }
        } else {
            console.error("WEIRD: there was no username in localstorage")
            return null
        }
    } else {
        console.error("WEIRD: there was not client process")
        return null
    }

}