import { defineStore } from 'pinia';

export const useSearchStore = defineStore("search", () => {

    // Parameters for the URL

    /**
     * This constant is used to hold the search query - that is later used in fetching with '?search='
     */
    const searchPart = ref<any>(null);
    /**
     * Is used to contain all of the tags that are selected in an array
     */
    const tagFilterPart = ref<any>(null);
    /**
     * The same as above.
     * 
     * Is used to contain all of the categories that are selected in an array
     */
    const categoryFilterPart = ref<any>(null);

    // not in use
    const authorFilterPart = ref<any>(null);

    /** Resets or puts all of the const here to it's initial values */

    const resetStore = () => {
        searchPart.value = null
        tagFilterPart.value = null
        categoryFilterPart.value = null        
    }

    return { searchPart, resetStore, categoryFilterPart, authorFilterPart, tagFilterPart }
})