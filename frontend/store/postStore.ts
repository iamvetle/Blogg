import { defineStore } from 'pinia';
import { usePaginationStore } from './paginationStore';

export const usePostStore = defineStore("Store for containing posts and related to posts", () => {

    /**
     * All posts that are fetched in the index are stored here. That includes at
     * initial page load. They have the structure of 'SnippetPostMultipleType'
     */

    const paginationStore = usePaginationStore()


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

    // /** 
    //  * Has all tags 
    // */
    // const allTags = ref<TagType[] | null>(null)


    /**
     * Contains all of the comments of a post
     * ? should I have this here though?
     */
    const allComments = ref<CommentType[] | null>(null)

    const resetStore = () => {
        posts.value = null
        followingPosts.value = null
        loggedInUserPosts.value = null
        allComments.value = null
    }

    /**  */
    const fetchFeedPreviewPosts = async () => {
        // const headers = {}
        const route = useRoute();

        /** 
         * TODO change the way that "url" is here now - maybe use runtime config?
         */
        const url = `http://127.0.0.1:8888/api/posts/feed${route.fullPath}`
        const headers = {
            Accept: 'application/json, text/plain, */*',
        }

        try {
            const response = await axios.get(url, { headers }) // switch this to usefetch later
            if (response.data == null) {
                console.error(`GET request to ${url} failed (${response.status})`, response.request)
                console.log(route.fullPath)
            } else {
                posts.value = response.data
                paginationStore.setPagination()
            }

        } catch (e: unknown) {
            console.error("A 'catch' fail happend:", e)
        }

        // set pagination
    }

    return {
        posts, fetchFeedPreviewPosts,

        resetStore, allComments, followingPosts, loggedInUserPosts, baseFetchURL, baseLoggedInUserPostsURL
    };
});
