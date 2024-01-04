export const useWatchStore = defineStore("Watches the router url", () => {

    const paginationStore = usePaginationStore()
    const tagStore = useTagStore()

    const router = useRouter()
    const route = useRoute()


        /** Adds the current page as a query to the local route url */
        watch(() => router.currentRoute.value.path, () => {
            // this makes sure the watcher doesn't do anything while it is not the correct page
            if (router.currentRoute.value.path === "/") {
                router.push({
                    query: {
                        ...route.query,
                        page: paginationStore.currentPageNumber,
                        tags: tagStore.selectedTagNames
                    }
                })
            }
        },
            { immediate: true }
    
        )
})