
/**
 * Basically sets up a pagination system based on the all of the posts
 * 
 * Takes the object and delegates the correct reactive variables
 * 
 * @param allPosts - The all posts
 * 
 * Has no return
 */

export const fixPagination = (allPosts: SnippetPostMultipleType)=> {
    if (allPosts != null) {

        const paginationStore = usePaginationStore()

        paginationStore.countOfPosts = allPosts.count
        paginationStore.next_page = allPosts.next
        paginationStore.previous_page = allPosts.previous
    } else {
        return null
    }
}