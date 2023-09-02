import { useGeneralStore } from "@/store/generalStore"

export default defineNuxtRouteMiddleware((to) => {
    if (process.client) {

        const token = localStorage.getItem("token")
        const store = useGeneralStore()

        token != null ? store.isAuthenticated = true : store.isAuthenticated = false  
        console.log(token)
        console.log(store.isAuthenticated)
    }
})