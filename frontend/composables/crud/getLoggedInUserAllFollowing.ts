import axios from "axios";
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

/** Fetches all tags possible */

/** @todo brukes denne? */

export const getLoggedInUserAllFollowing = async () => {
    const baseURL = "http://localhost:8888/api/min-side/following/"
    const loggedInUserStore = useLoggedInUserStore()

    try {
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }


        // SE HER. Okay, så "following, num_of_following, followers, num_of_followers, saved_post, og num_of_saved post"
        // blir alle sendt sammen med fetchen til logged in user. Likevel så har jeg en egen fetch til following, som gjør det problematisk
        // det er vel dumt jeg har en egen fetch for det?, det virker unødvendig. jeg har noe lignende på getLoggedInUserAllFollowers, men den bruker jeg ikke
        // tror jeg 

        const response = await axios.get(baseURL, { headers });

        if (response.data != null) {
            console.dir("OK: The users that the logged-in user is following, is fetched", response.data); // print to self

            loggedInUserStore.idArrayOfLoggedInUserFollowingUsers = []

            for (const following of response.data.results) {
                console.log(following.username) // print to self

                loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.push(following.username)
            }

            console.log(loggedInUserStore.idArrayOfLoggedInUserFollowingUsers)

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
