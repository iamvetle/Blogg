import axios from "axios";

export const getUnfollowUser = async (url: string) => {
	try {
		const token = localStorage.getItem("token");
		!token ? console.log("no token") : "";

		const headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`,
		};

		const response = await axios.get(url, { headers });
		console.log("OK: unfollowed user", response.data); // print to self
		return response.data;

	} catch (error) {
		console.log("did not manage to UNfollow user", error); // print to self
		return error;
	}
};
