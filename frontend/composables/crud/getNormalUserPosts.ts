import { getMethod } from '~/services/apiByCRUD';

/**
 * Fetches the posts of a user, specified in the url.
 * 
 * @param userURL - The url that the request is going to try to fetch from
 *  
 * @returns - The request response (.data, .status)
 */
export const getNormalUserPosts = async (userURL: string): Promise<NormalUserSnippetPostType | null> => {

	const headers = {
		"Content-Type": "application/json",
	};

        const response = await getMethod(userURL, headers)

        if (response) {

            return response.data

        } else {

            return null
        }
    }
