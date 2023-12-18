

/**
 * Takes the input and finds out if it is in the array of user-saved posts
 * 
 * @param postId - the id of the post
 * @returns - true or false 
 */
export const checkIfPostIsSaved = (postId:number) => {
    const loggedInUserStore = useLoggedInUserStore()
    
    if (loggedInUserStore.idArrayOfSavedPosts.includes(postId)) {
        return true
    } else {
        return false
    }
}