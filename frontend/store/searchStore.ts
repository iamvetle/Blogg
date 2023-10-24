export const useSearchStore = defineStore("search", () => {
    
    // searchPosts
    const lastSearch = ref("")

    /**
     * The URL that api fetches regarding search generally go to
     */
    const baseSearchURL = "http://localhost:8888/api/search/" // baseFeedURL


    // Parameters for the URL

    /**
     * This constant is used to hold the search query - that is later used in fetching with '?search='
     */
    const searchPart = ref<any>(null)
    /**
     * Is used to contain all of the tags that are selected in an array
     */
    const tagFilterPart = ref<any>(null)
    /**
     * The same as above.
     * 
     * Is used to contain all of the categories that are selected in an array
     */
    const categoryFilterPart = ref<any>(null)

    // not in use
    const authorFilterPart = ref<any>(null)

    return { baseSearchURL, searchPart, categoryFilterPart, authorFilterPart, tagFilterPart, lastSearch }
})