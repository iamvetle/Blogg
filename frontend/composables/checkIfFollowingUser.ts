import { useGeneralStore } from "~/store/generalStore"

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