import { defineStore } from 'pinia';

export const usePostStore = defineStore("Store for containing posts and related to posts", () => {

    /**
     * All posts that are fetched in the index are stored here. That includes at
     * initial page load. They have the structure of 'SnippetPostMultipleType'
     */

    /** This contains all posts on feed */
    const posts = ref<SnippetPostMultipleType | null>(null)

    /** This has only the posts made by the users the logged in user is following */
    const followingPosts = ref<SnippetPostMultipleType | null>(null)

    /**
     * All of the posts by the logged in user
     */
    const loggedInUserPosts = ref<LoggedInUserMultiplePostType | null>(null)

/**
 * The url that the baseFetchURL initially was before it started getting modified
 */
    const initialFeedBaseFetchURL = urls.api.posts.feed

    /**
     * The URL that api fetches regarding search generally go to
     */
    const baseFetchURL = ref<string>(initialFeedBaseFetchURL) // post_snippets_url
    const baseLoggedInUserPostsURL = ref<string>(urls.api.posts.myuser) // personal_post_snippets_url ? why is this with ref - think i should remove later

    /** 
     * Has all (paginated) tags 
    */
    const allTags = ref<TagType[] | null>(null)
    /**
     * Has all (paginated) tags 
     */
    const allCategories = ref<CategoryType[] | null>(null)

    /**
     * Contains all of the comments of a post
     * ? should I have this here though?
     */
    const allComments = ref<CommentType[] | null>(null)

    const resetStore = () => {
        posts.value = null
        followingPosts.value = null
        loggedInUserPosts.value = null
        allTags.value = null
        allCategories.value = null
        allComments.value = null
    }

    return { posts, resetStore, allComments, followingPosts, allCategories, allTags, loggedInUserPosts, baseFetchURL, baseLoggedInUserPostsURL };
});
