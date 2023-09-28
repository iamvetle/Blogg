// ASSUMES URL

import { useGeneralStore } from "~/store/generalStore"

export const fixPagination = async (response_data:ArticlesSnippetsType | null) => {
    if(response_data != null) {

        const store = await useGeneralStore()

        store.number_of_posts_count = response_data.count

        const calculate_total_pages = () => {
            const num = store.number_of_posts_count as number / 10
            return Math.ceil(num)
        }

        store.total_pages_count = calculate_total_pages()
        store.next_page_link = response_data.next
        store.previous_page_link = response_data.previous
        store.last_page_link = `${store.baseFeedURL}?page=${store.total_pages_count}`
        store.current_page = response_data.current_page
    } else {
        console.log("pagination error on composable")
    }
}