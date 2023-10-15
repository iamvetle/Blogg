import { defineStore } from 'pinia'
import { SnippetPostMultipleType } from '~/typescript/interfaces'

export const useSearchStore = defineStore("search", () => {
    
    // STATES 

    const searchPosts = ref<SnippetPostMultipleType | null>(null)
    const lastSearch = ref("")
    const baseSearchURL = ref("http://localhost:8888/api/search/")

    // Pagnation
    const next_page_link = ref("")
    const previous_page_link = ref("")
    const last_page_link = ref("")

    const total_pages_count = ref<number | null>(null);
    const number_of_posts_count = ref<number | null>(null);
    const current_page = ref<number | null>(null);

    // ACTIONS ...

    return { baseSearchURL, searchPosts, lastSearch, next_page_link, previous_page_link, last_page_link, total_pages_count, number_of_posts_count, current_page }
})