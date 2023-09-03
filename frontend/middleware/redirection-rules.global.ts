//@ts-nocheck

import { useGeneralStore } from "@/store/generalStore"

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {

        const token = localStorage.getItem("token")
        const store = useGeneralStore()

        token != null ? store.isAuthenticated = true : store.isAuthenticated = false  

        const path_place = to.path

        if (token == null) { // No token

            switch(path_place) {
                case "/min-side":
                    return navigateTo("/login")
                case "/newpost":
                    return navigateTo("/login")
                case "/loggut":
                    return navigateTo("/")
                default:
                    console.log("Allowed navigation route: ", `from ${from.path} to ${to.path}`)
                    return
            }
        } else if (token != null ) { // If have token
            
            switch(path_place) {
                case "/registrer":
                    return navigateTo("/")
                case "/login":
                    return navigateTo("/min-side")
                default:
                    console.log("Allowed navigation route: ", `from ${from.path} to ${to.path}`)
                    return null     
            }
        }
    }
})