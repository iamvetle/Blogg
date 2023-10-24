import { useLoggedInUserStore } from '~/store/loggedInUserStore'

export const checkIfPostIsSaved = (postId:number) => {
    const loggedInUserStore = useLoggedInUserStore()
    
    if (loggedInUserStore.idArrayOfSavedPosts.includes(postId)) {
        return true
    } else {
        return false
    }
}