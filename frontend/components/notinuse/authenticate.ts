export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()

    if (process.client) {
        authStore.authStoreSetup()

        if(authStore.isAuthenticated) {
            return navigateTo("/")
        }
    }
})