export const usePostStore = defineStore("Store for containing posts and related to posts", () => {

    /**
     * All posts that are fetched in the index are stored here. That includes at
     * initial page load. They have the structure of 'SnippetPostMultipleType'
     */

    const posts = ref<SnippetPostMultipleType | null>(null)

    /**
     * The API url endpoint for fetching logged-in user posts
     */
    const loggedInUserPosts = ref<LoggedInUserMultiplePostType | null>(null)

    // Links
    /**
     * kan egentlig likesågjerne bare fetch alt fra search (eller feed senere)
     */
    const baseFeedURL = ref<string>("http://localhost:8888/api/feed/") // post_snippets_url
    const baseLoggedInUserPostsURL = ref<string>("http://localhost:8888/api/min-side/posts/") // personal_post_snippets_url

    /** 
     * Has all (paginated) tags 
    */
    const allTags = ref<AllTagsType | null>(null)
    /**
     * Has all (paginated) tags 
     */
    const allCategories = ref<AllCategoriesType>([])

    return { posts, allCategories, allTags, loggedInUserPosts, baseFeedURL, baseLoggedInUserPostsURL };
});
