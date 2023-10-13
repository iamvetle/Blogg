// ASSUMES URL

import { useGeneralStore } from "~/store/generalStore"

export const fixPagination = async (response:SnippetPostMultipleType) => {
    if(response != null) {

        const store = await useGeneralStore()

        store.number_of_posts_count = response.count

        const calculate_total_pages = () => {
            const num = store.number_of_posts_count as number / 10
            return Math.ceil(num)
        }

        store.total_pages_count = calculate_total_pages()
        store.next_page_link = response.next
        store.previous_page_link = response.previous
        store.current_page = response.current_page
    } else {
        console.log("pagination error on composable")
    }
}