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

    const router = useRouter()

    const postStore = usePostStore()

    const activeFetchURL = computed(() => {

        const base = "http://127.0.0.1:8888/api/posts/feed"

        const currentRoute = router.currentRoute.value.fullPath

        return `${base}${currentRoute}`
    })

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

    // const route = useRoute()
    // const router = useRouter()

    /** Adds the current page as a query to the local route url */
    // watch(() => router.currentRoute.value.path, () => {
    //     // this makes sure the watcher doesn't do anything while it is not the correct page
    //     if (router.currentRoute.value.path === "/") {
    //         router.replace({
    //             query: {
    //                 ...route.query,
    //                 page: currentPageNumber.value
    //             }
    //         })
    //     }
    // },
    //     { immediate: false }

    // )


    /**
     * resets everything
     */
    // const resetStore = () => {
    //     activeFetchURL.value = urls.api.posts.feed
    //     next_page.value = ""
    //     previous_page.value = ""

    //     countOfPosts.value = 0

    //     currentPageNumber.value = 0
    // }

    return {
        activeFetchURL,
        // resetStore, 
        setPagination, next_page, previous_page, countOfPosts, currentPageNumber
    }
})