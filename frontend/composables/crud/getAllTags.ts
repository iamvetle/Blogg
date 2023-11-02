import { usePostStore } from '~/store/postStore';
import { getToken } from '../getToken';
/** Fetches all tags possible */

/** @todo Jeg burde kanskje ha et sted hvor jeg fetcher alle "filters?" */

/**
 * Fetches all tags.
 * 
 * The tags in store is updated if the request was successfull
 * 
 * @returns - The request response (.data, .status)
 */
export const getAllTags = async () => {
    const baseURL = "http://localhost:8888/api/tags/"
    const postStore = usePostStore()

    /**
     * Fetches the token from local storage, or just returns null.
     */
    const token = getToken()

    if (token) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };

        const response = await getMethod(baseURL, headers)

        if (response) {
            postStore.allTags = response.data
            
            return response
        } else {
            return null
        }
    }
}
