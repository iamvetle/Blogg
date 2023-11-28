import { useLoggedInUserStore } from "~/store/loggedInUserStore"

/**
 * Takes the parameter and checks whether the logged in user is following it or not
 * @param username - the username/user that you want to check
 * @returns - true or false depending on whether the logged-in-user is follow ing the user
 */
export const checkIfFollowingUser = (username:string): boolean => {
    const loggedInUserStore = useLoggedInUserStore()
    // console.log(username) // print to self
    
    // console.log(typeof loggedInUserStore.idArrayOfLoggedInUserFollowingUsers) // print to self
    // console.log(loggedInUserStore.idArrayOfLoggedInUserFollowingUsers)
    if (loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.includes(username)) {
        // console.log("true") // print to self
        return true
    } else {
        // console.log("false") // print to self
        return false
    }
}