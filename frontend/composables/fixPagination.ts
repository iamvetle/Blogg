
/**
 * Basically sets up a pagination system based on the all of the posts
 * 
 * CALLS the store version - "real version"
 * 
 * Takes the object and delegates the correct reactive variables
 * 
 * @param all_posts - The all posts
 * 
 * Has no return
 */

export const fixPagination = (all_posts: SnippetPostMultipleType)=> {
    if (all_posts != null) {

        const paginationStore = usePaginationStore()

        // just checking if it exists yet - the store that is
        if(paginationStore.activeFetchURL) {
            paginationStore.setPagination(all_posts)
        }
    } else {
        console.log("pagination error on composable")
        return null
    }
}