export const useWatchUrl = () => {
    const router = useRouter()
    const route = useRoute()
    // const urlStore = useURLStore()

    // const fullPath = route.fullPath
    // const currentRoute = router.currentRoute

    const unwatch = watchEffect(

        async () => {
        const path = route.path
            // If the path is "index"
            if(path == "/" ) {
                alert(path)
                console.info("Path is supposed to be '/':", path)
            };
            // if the path is "/following"
            if(path == "/following") {
                alert(path)
                console.info("Path is supposed to be '/following':", path)
                await getPostMultipleFollowingOnly()
            };
        },
        // * men trenger jeg den? 
        // Set deep: true to watch nested properties of the array
    );

    // Remember to clean up the watcher when the component is unmounted
    // * is it that important
    onBeforeUnmount(() => {
        unwatch();
    });


}