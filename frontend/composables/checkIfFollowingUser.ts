import { useGeneralStore } from "~/store/generalStore"

export const checkIfFollowingUser = (username:string) => {
    const store = useGeneralStore()
    console.log(username)
    
    console.log(typeof store.idArrayOfFollowingUsers)
    
    if (store.idArrayOfFollowingUsers.includes(username)) {
        console.log("true")
        return true
    } else {
        console.log("false")
        return false
    }
}