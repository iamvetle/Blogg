import { getToken } from '../getToken';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';

/**
 * Fetches the profile information about the logged in user.
 * 
 * Also 'resets' and re-populates the two arrays of 'users following' and
 * 'saved posts'
 * 
 * Stores the information in different store variables
 *  
 * @returns - The request response (.data, .status), or just null
 */
export const getLoggedInUserProfile = async () => {

	/**
	 * Fetches the token from local storage, or just returns null.
	 */
	const loggedInUserStore = useLoggedInUserStore()
	const postStore = usePostStore()
	const loggedInUserProfileURL = "http://localhost:8888/api/min-side/"

	const token = getToken()

	if (token) {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		};

		/**
		 * The actual fetching function for the logged in user profile information
		 */


		const response = await getMethod(loggedInUserProfileURL, headers)

		if (response) {

			loggedInUserStore.loggedInUserProfile = response.data as LoggedInUserProfileType

			/**
			 * Turn it empty, in order to populate it afterwords.
			 */
			loggedInUserStore.idArrayOfSavedPosts = []
			loggedInUserStore.idArrayOfLoggedInUserFollowingUsers = []

			/**
			 * Populates the array with all of the posts (id) the user has saved
			 */
			for (const savedPost of loggedInUserStore.loggedInUserProfile.saved_posts) {
				loggedInUserStore.idArrayOfSavedPosts.push(savedPost.post.id)

			}

			/**
			 * Populates the array with the username of all of the users the
			 * logged in user is following
			 */
			for (const following of loggedInUserStore.loggedInUserProfile.following) {
				loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.push(following.username)
			}


			/**
			 * Has both 'response.data', and 'response.status'
			 */
			return response

		}
		if (response == null) {
			return null
		}

	}
}
