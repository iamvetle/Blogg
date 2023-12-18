export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()

    // If not authenticated
    if (authStore.isAuthenticated === false) {
        return navigateTo("/")
    }

})