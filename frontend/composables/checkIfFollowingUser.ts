import { useGeneralStore } from "~/store/generalStore"

export const checkIfFollowingUser = (username:string) => {
    const store = useGeneralStore()
    
    if (store.idArrayOfFollowingUsers.includes(username)) {
        return true
    } else {
        return false
    }
}