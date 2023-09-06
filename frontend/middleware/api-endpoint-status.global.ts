import { useGeneralStore } from "~/store/generalStore";

export default defineNuxtRouteMiddleware(async (to) => {
    const store = useGeneralStore()
    const apiURL = "http://localhost:8888/api/health_check/"
    const response = (await apiEndpointCheck(apiURL)) ?? 404
    console.log(response)
    if (response !== 404) {
        console.log("API:", response.status)
    }
    else {
        console.log(`API endpoint is down (${response}). Turn it back on to be able to retrieve posts and other data`)
        store.apiDownError = true
    }
    });