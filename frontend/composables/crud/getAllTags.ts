import { getMethod } from '~/services/apiByCRUD';

/** Fetches all tags possible */

/**
 * Fetches all tags.
 * 
 * The tags in store is updated if the request was successfull
 * 
 * @returns - The request response (.data)
 */
export const getAllTags = async (): Promise<TagType[] | null> => {
    const baseURL = urls.api.posts.filter.tags
    const postStore = usePostStore()

    /**
     * Fetches the token from local storage, or just returns null.
     */
    const authStore = useAuthStore()

const token = authStore.retrieveToken()

    if (token === null) {
        console.log("There was not token")
        return null
    }
    
    const headers = {
        "Content-Type": "application/json",
    };

    const response = await getMethod(baseURL, headers)

    if (response) {
        postStore.allTags = response.data

        return response.data
    } else {
        return null
    }
}
