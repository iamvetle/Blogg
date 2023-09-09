import axios from "axios";

interface FollowerType {
	username:string;
}

export const fetchAllFollowers = async (url: string) => {
try {
	const token = localStorage.getItem("token");
	const headers = {
	"Content-Type": "application/json",
	Authorization: `Token ${token}`,
	};

	const response = await axios.get<FollowerType[]>(url, { headers });

	if (response.data != null) {
	console.log("OK: Followers fetched", response.status, response.data); // print to self
	
	return response.data;
	
	} else {
	console.log("OBS! Fetching succedded, but response(data) was:", response.status, response.data) // print to self

	return response.data
	}

} catch (error) {
	console.error("ERROR: An error occured while trying to fetch followers: ", error); // print to self
	return null;
}
};
