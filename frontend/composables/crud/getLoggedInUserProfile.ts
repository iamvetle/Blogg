import axios from "axios";
import { useGeneralStore } from "~/store/generalStore";

export const getLoggedInUserProfile = async () => {
try {
	const store = useGeneralStore()

	const LoggedinUserURL = "http://localhost:8888/api/min-side/"

	const token = localStorage.getItem("token");
	!token ? console.log("no token") : "";

	const headers = {
	"Content-Type": "application/json",
	Authorization: `Token ${token}`,
	};

	const response = await axios.get(LoggedinUserURL, { headers });
	console.log("OK: fetched personal user account", response.data); // print to self

	store.personalUser = response.data as LoggedInUserProfileType
	console.dir(response.data)

	store.idArrayOfSavedPosts = []
	store.idArrayOfLoggedInUserFollowingUsers=[]


	for (const savedPost of store.personalUser.saved_posts) {
	console.log(savedPost.post.id) // print to self

	store.idArrayOfSavedPosts.push(savedPost.post.id)

	}

	for (const follower of store.personalUser.following) {
		store.idArrayOfLoggedInUserFollowingUsers.push(follower.username)
		console.log(follower.username)

	}

	return response.data;
} catch (e) {
	console.log("FAILED: did not fetch personal account") // print to self - not working at all, no idea why
	// is it only with get requests?
	return e;
}
};
