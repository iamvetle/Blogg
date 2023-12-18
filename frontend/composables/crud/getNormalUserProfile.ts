import { getMethod } from '~/services/apiByCRUD';

/**
 * Fetches the information about the user, specified in the url.
 * 
 * @param userURL - The url that the request is going to try to fetch from
 *  
 * @returns - The request response (.data, .status)
 */
export const getNormalUserProfile = async (userURL: string): Promise<NormalUserProfileType | null> => {

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
