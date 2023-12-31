import { getMethod } from '~/services/apiByCRUD';


/**
 * Fetches all of the posts made by the logged in user
 *  
 * @param userURL - The url that the request is going to try to fetch from
 *  
 * @returns - The request response (.data, .status) or null
 */
export const getLoggedInUserAllPostSnippets = async (api_endpoint_url: string): Promise<SnippetPostMultipleType | null> => {

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
    Authorization: `Token ${token}`,
  };

  const response = await getMethod(api_endpoint_url, headers)

  if (response) {

    postStore.loggedInUserPosts = response.data;

    postStore.posts = response.data

    /**
     * Has the option to return the response **directly** as well.
     * This can be usefull to check if the response was 200 OK, for instance.
     */
    return response.data

  } else {

    return null
  }
}
