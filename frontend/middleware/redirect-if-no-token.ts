import path from "path"

export default defineNuxtRouteMiddleware((to) => {
    if (process.client) {
        const token = localStorage.getItem("token")
        console.log("first part")
        if (token === null) {
            console.log("second part")
            return navigateTo("/")
        }
    }
})