export const useWatchStore = defineStore("Watches the router url", () => {

    const paginationStore = usePaginationStore()
    const tagStore = useTagStore()

    const router = useRouter()
    const route = useRoute()

    /** Adds the current page as a query to the local route url */
    watch(() => [paginationStore.currentPageNumber, tagStore.selectedTagNames], () => {
        // this makes sure the watcher doesn't do anything while it is not the correct page
        if (router.currentRoute.value.path === "/") {

            /**
             * is supposed to NOT assign a make "page" be in the browser url if the "page" is 1
             * ? not quite sure if it works
             */
            const pageNumber = paginationStore.currentPageNumber > 1 ? paginationStore.currentPageNumber : undefined

            router.push({
                query: {
                    ...route.query,
                    page: pageNumber,
                    tags: tagStore.selectedTagNames
                }
            })
            console.info(`watchser in watchstore ${JSON.stringify(route.query.tags)}`)
        }
    },
        { immediate: false }

    )

    // watch(() => route.query.tags, () => {
    //     if (router.currentRoute.value.path === "/") {
    //         console.info(route.query.tags)

    //         let tagsArray = route.query.tags as string[]
    //         let tags = []

    //         for (let tag in tagsArray) {
    //             tags
    //         }
    //     }
    // }, {
    //     immediate: true
    // })

})