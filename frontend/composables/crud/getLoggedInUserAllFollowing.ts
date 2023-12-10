import { getMethod } from '~/services/apiByCRUD';

/** 
 * Get's all of the users the logged-in-user is following
 * 
 * ! Not in use (normal logged-in-user-profile fetch is used for this instead)
 * 
 * ? Kanskje meningsløst å ha denne?
 */

export const getLoggedInUserAllFollowing = async (): Promise<FollowingType[] | null> => {
    const baseURL = "http://localhost:8888/api/min-side/following/"
    const loggedInUserStore = useLoggedInUserStore()

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
        Authorization: `Token ${token}`
    }

    const response = await getMethod(baseURL, headers);

    if (response) {
        // console.log("OK: got all of the followers of logged in user", response.data); // print to self
        loggedInUserStore.idArrayOfLoggedInUserFollowingUsers = []

        /** (Re)creates an array of users the logged-in user is following */
        for (const following of response.data.results) {
            // console.log(following.username) // print to self

            loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.push(following.username)
        }
        // console.log(loggedInUserStore.idArrayOfLoggedInUserFollowingUsers) // print to self

        return response.data;
    } else {
        console.error("ERROR: An error occured while trying to fetch tags: ") // print to self
        return null
    }

}
