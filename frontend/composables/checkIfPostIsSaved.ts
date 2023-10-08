import { useGeneralStore } from "~/store/generalStore"

export const checkIfPostIsSaved = (postId:number) => {
    const store = useGeneralStore()
    
    if (store.idArrayOfSavedPosts.includes(postId)) {
        return true
    } else {
        return false
    }
}