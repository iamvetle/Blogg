export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === "/post/" || to.path === "/post" ) {
        return navigateTo("/")
    }
})