import axios from "axios";

export const fetchAllTags = async () => {
    const baseURL = "http://localhost:8888/api/tags/"

    try {
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };

        const response = await axios.get(baseURL, { headers });

        if (response.data != null) {
            console.log("OK: tags fetched", response.status, response.data); // print to self

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
