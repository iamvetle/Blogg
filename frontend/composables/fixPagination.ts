// ASSUMES URL

import { useGeneralStore } from "~/store/generalStore"

export const fixPagination = (response_data:SnippetPostType | null) => {
    if(response_data != null) {

        const store = useGeneralStore()

        store.number_of_posts_count = response_data.count

        const calculate_total_pages = () => {
            let num = store.number_of_posts_count as number / 4
            return Math.ceil(num)
        }

        store.total_pages_count = calculate_total_pages()
        store.next_page_link = response_data.next
        store.previous_page_link = response_data.previous
        store.last_page_link = `${store.baseFeedURL}?page=${store.total_pages_count}`
    } else {
        console.log("pagination error on composable")
    }
}