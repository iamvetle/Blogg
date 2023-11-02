import { defineStore } from 'pinia';

export const useLoggedInUserStore = defineStore("Store for storing information about the logged in user", () => {
    
    /**
     * Contains all of the information about the logged-in user
     */
    const loggedInUserProfile = ref<LoggedInUserProfileType | null>(null) // personalUser


    /**
     * The id of all of the posts the logged in user has saved is stored here
     */
    const idArrayOfSavedPosts = ref<number[]>([])

    /**
     * Keeps the username of all the users the logged-in user is following
     */
    const idArrayOfLoggedInUserFollowingUsers = ref<string[]>([])



    return { loggedInUserProfile, idArrayOfSavedPosts, idArrayOfLoggedInUserFollowingUsers }
})

