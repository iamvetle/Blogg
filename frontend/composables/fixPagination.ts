import { usePaginationStore } from '~/store/paginationStore';
// ASSUMES URL

export const fixPagination = async (response:SnippetPostMultipleType) => {
    if(response != null) {

        const paginationStore = usePaginationStore()

        paginationStore.number_of_posts = response.count

        /** i dont know if this works */
        const calculate_total_pages = () => {
            const num = paginationStore.number_of_posts as number / 10
            return Math.ceil(num)
        }

        paginationStore.all_pages_count = calculate_total_pages()
        paginationStore.next_page = response.next
        paginationStore.previous_page = response.previous
        paginationStore.current_page_number = response.current_page
    } else {
        console.log("pagination error on composable")
    }
}