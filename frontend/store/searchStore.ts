import { defineStore } from 'pinia'

export const useSearchStore = defineStore("search", () => {
    const searchPosts = ref(null)
    const lastSearch = ref("")

    // Pagnation
    const next_page_link = ref<string | null>(null)
    const previous_page_link = ref<string | null>(null)
    const last_page_link = ref<string | null>(null)

    const total_pages_count = ref<number | null>(null);
    const number_of_posts_count = ref<number | null>(null);
    const current_page = ref<number | null>(null);

    return { searchPosts, lastSearch, next_page_link, previous_page_link, last_page_link, total_pages_count, number_of_posts_count, current_page }
})