import { usePaginationStore } from '~/store/paginationStore';

/**
 * Basically sets up a pagination system based on the all of the posts
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

        paginationStore.number_of_posts = all_posts.count

        /** i dont know if this works */
        const calculate_total_pages = () => {
            const num = paginationStore.number_of_posts as number / 10
            return Math.ceil(num)
        }

        paginationStore.all_pages_count = calculate_total_pages()
        paginationStore.next_page = all_posts.next
        paginationStore.previous_page = all_posts.previous
        paginationStore.current_page_number = all_posts.current_page
    } else {
        console.log("pagination error on composable")
        return null
    }
}