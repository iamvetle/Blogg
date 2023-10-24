import axios from "axios";
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

export const getLoggedInUserProfile = async () => {
try {
	const loggedInUserStore = useLoggedInUserStore()

	const LoggedinUserURL = "http://localhost:8888/api/min-side/"

	const token = localStorage.getItem("token");
	!token ? console.log("no token") : "";

	const headers = {
	"Content-Type": "application/json",
	Authorization: `Token ${token}`,
	};

	const response = await axios.get(LoggedinUserURL, { headers });
	console.log("OK: fetched personal user account", response.data); // print to self

	loggedInUserStore.loggedInUserProfile = response.data as LoggedInUserProfileType
	console.dir(response.data)

	loggedInUserStore.idArrayOfSavedPosts = []
	loggedInUserStore.idArrayOfLoggedInUserFollowingUsers=[]


	for (const savedPost of loggedInUserStore.loggedInUserProfile.saved_posts) {
	console.log(savedPost.post.id) // print to self

	loggedInUserStore.idArrayOfSavedPosts.push(savedPost.post.id)

	}

	for (const follower of loggedInUserStore.loggedInUserProfile.following) {
		loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.push(follower.username)
		console.log(follower.username)

	}

	return response.data;
} catch (e) {
	console.log("FAILED: did not fetch personal account") // print to self - not working at all, no idea why
	// is it only with get requests?
	return e;
}
};
