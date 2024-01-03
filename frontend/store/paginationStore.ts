import { defineStore } from 'pinia';

export const usePaginationStore = defineStore("Pagination Store", () => {

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
    const last_page_link = ref("") // last_page_link

    const all_pages_count = ref<number>(0); // total_pages_count
    const number_of_posts = ref<number>(0); // number_of_posts_count

    const current_page_number = ref<number>(1); // current_page
    
    const route = useRoute()
    const router = useRouter()

    /** Adds the current page as a query to the local route url */
    watchEffect(() => {
        router.replace({
            query: {
                ...route.query,
                page:current_page_number.value
            }
        })        
    })


    /**
     * resets everything
     */
    const resetStore = () => {
        activeFetchURL.value = urls.api.posts.feed
        next_page.value = ""
        previous_page.value = ""
        last_page_link.value = ""
    
        all_pages_count.value = 0
        number_of_posts.value = 0
    
        current_page_number.value = 0 
    }

    return { activeFetchURL, resetStore, next_page, previous_page, last_page_link, all_pages_count, number_of_posts, current_page_number }
})