import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const baseURL = "http://localhost:8888/api/health_check";

    const testAPIAvailability = async () => {
        try {
            const response = await axios.get(baseURL);
            if (response.status === 200) {
                console.log(
                    `API-endpoint is up. ${baseURL} returned ${response.status}`,
                );
                return response;
            } else {
                console.log(
                    `API-endpoint is down. ${baseURL} did not return 200 OK`,
                );
                return response;
            }
        } catch (error) {
            console.log("Server is down", error);
            alert(error);
        }
    };

    return {
        provide: {
            injected:() => testAPIAvailability
        }
    }
});
