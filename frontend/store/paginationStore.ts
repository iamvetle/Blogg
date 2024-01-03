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

    const postStore = usePostStore()

    const activeFetchURL = ref<any>(urls.api.posts.feed)
    
    const next_page = ref<null | string>(null)
    const previous_page = ref<null | string>(null) 

    const countOfPosts = ref<number>(0);

    const currentPageNumber = ref<number>(1);

    const setPagination = () => {
        if (postStore.posts != null) {
    
            countOfPosts.value = postStore.posts.count
            next_page.value = postStore.posts.next
            previous_page.value = postStore.posts.previous
        }
    }
    
    const route = useRoute()
    const router = useRouter()

    /** Adds the current page as a query to the local route url */
    watchEffect(() => {
        router.replace({
            query: {
                ...route.query,
                page:currentPageNumber.value
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
    
        countOfPosts.value = 0
    
        currentPageNumber.value = 0 
    }

    return { activeFetchURL, resetStore, setPagination, next_page, previous_page, countOfPosts, currentPageNumber }
})