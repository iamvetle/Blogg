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
    console.log(baseURL)
    
    const tagStore = usePostStore()

    const headers = {
        "Content-Type": "application/json",
    };

    const response = await getMethod(baseURL, headers)

    if (response) {
        tagStore.allTags = response.data

        return response.data
    } else {        
        return null
    }
}
