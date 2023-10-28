import { getToken } from '../getToken';

/**
 * Fetches the information about the user, specified in the url.
 * 
 * @param userURL - The url that the request is going to try to fetch from
 *  
 * @returns - The request response (.data, .status)
 */
export const getNormalUserProfile = async (userURL: string) => {

  /**
   * Fetches the token from local storage, or just returns null.
   */
  const token = getToken()

  if (token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const response = await getMethod(userURL, headers)

    if (response) {

      return response

    } else {

      return null
    }
  }
}
