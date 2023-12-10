import { getMethod } from '~/services/apiByCRUD';

/**
 * Fetches the information about the user, specified in the url.
 * 
 * @param userURL - The url that the request is going to try to fetch from
 *  
 * @returns - The request response (.data, .status)
 */
export const getNormalUserProfile = async (userURL: string): Promise<NormalUserProfileType | null> => {

  /**
   * Fetches the token from local storage, or just returns null.
   */
  const authStore = useAuthStore()

const token = authStore.retrieveToken()

  if (token === null) {
    console.log("There was no token")
    return null
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };

  const response = await getMethod(userURL, headers)

  if (response) {

    return response.data

  } else {

    return null
  }
}
