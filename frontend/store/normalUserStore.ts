export const useNormalUserStore = defineStore("Store for storing user information", () => {
    
    /**
     * All information about a user of 'user/[id].vue' will be here.
     */

    const normalUserProfile = ref<NormalUserProfileType | null>(null) // theUser


    return { normalUserProfile }
})