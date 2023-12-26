/**
 * Watches the tag filter part of the search store and updates the active fetch URL in the pagination store accordingly.
* 
* Constructs a url and sets it as the active url
*/
export const useWatchFeedDropdownFilter = () => {
    let unwatch: any
    const feed = urls.api.posts.feed

    onMounted(() => {

        const searchStore = useSearchStore()
        const paginationStore = usePaginationStore()

        unwatch = watch(
            () => searchStore.tagFilterPart, () => {
                // Thil construct a new "active" URL
                paginationStore.activeFetchURL = constructURL(feed);
            },
            { deep: true },
            // * men trenger jeg den? 
            // Set deep: true to watch nested properties of the array
        );
    });

    // Remember to clean up the watcher when the component is unmounted
    // * is it that important
    onBeforeUnmount(() => {
        unwatch();
    });
}