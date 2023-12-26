import { defineStore } from 'pinia';

// This is all based on that the backend uses a limit offset system
export const usePaginationStore = defineStore("Deals with the pagination bar and links for fetching posts", () => {

    /**
     * This store contains links associated pagination.
     * 
     * It is used to switch between pages. They also updated by search and initial load.
     * 
     */

    /**
     * This url gets update frequently. It is supposed to represent the 
     * last url a fetch call for index posts was made to.
     */
    const activeFetchURL = ref<any>(urls.api.posts.feed)

    const next_page = ref("") // next_page_link
    const previous_page = ref("") // previous_page_link

    const total_number_of_posts = ref<number>(0); // total_number_of_posts_count

    const current_page_number = ref<number>(0); // current_page

    const active_page = ref<number>(1)

    /** Calculates the total count of pages */
    const totalCountOfPages = computed(() => {
        console.info("A new 'calculation' was made to find out the total count of pages")
        const num = total_number_of_posts.value / 10

        return Math.ceil(num) || 0
    })

    /** Corrects all the values used by the (feed)pagination bar */
    const setPagination = (responseData: SnippetPostMultipleType) => {
        // The next page value gets in the next page variable
        next_page.value = responseData.next || ""
        // The previous page value gets in the previous page variable
        previous_page.value = responseData.previous || ""

        total_number_of_posts.value = responseData.count
    }


    /**
     * resets everything in the store
     */
    const resetStore = () => {
        console.info("The resetStore function that 'clears' everything in the pagination store was called")

        activeFetchURL.value = urls.api.posts.feed
        next_page.value = ""
        previous_page.value = ""

        // totalCountOfPages.value = 0 // is pagination now
        total_number_of_posts.value = 0

        current_page_number.value = 0
    }

    return { activeFetchURL, active_page, setPagination, resetStore, next_page, previous_page,  totalCountOfPages, total_number_of_posts, current_page_number }
})