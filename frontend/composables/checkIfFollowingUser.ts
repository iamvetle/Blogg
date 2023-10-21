import { useGeneralStore } from "~/store/generalStore"


/**
 * Takes the parameter and checks whether the logged in user is following it or not
 * @param username - the username/user that you want to check
 * @returns - true or false depending on whether the logged-in-user is follow ing the user
 */
export const checkIfFollowingUser = (username:string) => {
    const store = useGeneralStore()
    console.log(username) // print to self
    
    console.log(typeof store.idArrayOfLoggedInUserFollowingUsers) // print to self
    
    if (store.idArrayOfLoggedInUserFollowingUsers.includes(username)) {
        console.log("true") // print to self
        return true
    } else {
        console.log("false") // print to self
        return false
    }
}