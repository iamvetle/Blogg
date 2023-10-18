// async


/**
 * 
 * 
 * I think I have to split up the api to smaller parts
 * like not everything from a user in one api request
 * and also, I have to awear of where i am actually calling the api - in the pages?, component, composable?
 *  i have to find a system for that
 */

import axios from 'axios'

export const getNormalUserPosts = async (userURL: string) => {

    try {
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };

        const response = await axios.get(userURL, { headers });

        if (response.data != null) {
            console.log("OK: data fetched", response.data); // print to self

            return response.data
        }
        else {
            console.log("OBS! Fetching succsedded, but response(data) was:", response.data) // print to self
        }

    } catch (error) {
        console.error("ERROR: An error occured while trying to fetch data: ", error); // print to self
    }
};
