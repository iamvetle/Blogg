export const useDeConstructURL = () => {





    onBeforeMount(() => {
        // const router = useRouter();
        const route = useRoute();

        const searchStore = useSearchStore();
        const paginationStore = usePaginationStore()


        const tags = route.query.tags
        const search = route.query.search ?? null
        const page = route.query.page

        // fix 
        // if (tags) {

        // }

        searchStore.searchPart = search;

        searchStore.tagFilterPart = tags;

        console.info("The tags query deconstructed from the url was:", tags)
        console.info("The search query deconstructed from the url was:", search)
        console.info("The page query deconstructed from the url was:", page)

        if (typeof page === "number") {
            paginationStore.active_page = page;
        } else {
            paginationStore.active_page = 1;
        }

    })
}