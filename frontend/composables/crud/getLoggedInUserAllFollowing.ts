import axios from "axios";
import { useGeneralStore } from '~/store/generalStore';
/** Fetches all tags possible */

export const getLoggedInUserAllFollowing = async () => {
    const baseURL = "http://localhost:8888/api/min-side/following/"
    const store = useGeneralStore()

    try {
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };

        const response = await axios.get(baseURL, { headers });

        if (response.data != null) {
            console.dir("OK: The users that the logged-in user is following, is fetched", response.data); // print to self

            for (const following of response.data) {
                console.log(following.username) // print to self

                store.idArrayOfFollowingUsers.push(following.username)
            }

            console.log(store.idArrayOfFollowingUsers)

            return response.data;



        } else {
            console.log("OBS! Fetching succedded, but response(data) was:", response.status, response.data) // print to self

            return response.data
        }

    } catch (error) {
        console.error("ERROR: An error occured while trying to fetch tags: ", error); // print to self
        return null;
    }
};
