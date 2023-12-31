<template>
    <div data-test="default-slot">
        <div :class="isFollowingClass" v-if="checkIfFollowingUser(username) === true" id="following"
            @click="unFollowUser(username)" @mouseover="followText = 'Unfollow'" @mouseleave="followText = 'Following'">
            <p class="not-prose">{{ followText }}</p>
        </div>

        <div :class="isNotFollowingClass" v-if="checkIfFollowingUser(username) === false" id="follow"
            @click="followUser(username)">
            <p class="not-prose">Follow</p>
        </div>
    </div>
</template>

<script setup lang="ts">


/** Represents the text that is going to be displayed on the (un)follow button */
const followText = ref("Following")
const loggedInUserStore = useLoggedInUserStore()

onMounted(async () => {
	/**
	 * Checks if the pinia store already has information about whom the logged-in user is following. 
	 */
	if (!Array.isArray(loggedInUserStore.idArrayOfLoggedInUserFollowingUsers) || !loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.length) {
		await getLoggedInUserProfile(urls.users.myUser.profile);
	}
})

const emit = defineEmits<{
    followersPluss:[void];
    followersMinus:[void];
}>();

withDefaults(defineProps<{
    username: string,
    isFollowingClass?: string,
    isNotFollowingClass?: string,
}>(), {
    username: "nousername",
    isFollowingClass: "w-fit h-fit cursor-pointer bg-primary text-onPrimary hover:bg-inversePrimary p-1 rounded-md",
    isNotFollowingClass: "w-fit h-fit cursor-pointer p-1 rounded-md bg-inversePrimary text-onPrimary hover:bg-primary",
})
/**
 * Unfollows the user
 * 
 * @param username The username of the user that is going to be unfollowed
 */
const unFollowUser = async (username: string) => {
    const theNormalUserProfileUnfollowURL = urls.users.user.unfollow(username);

    const responseData = await getUnfollowUser(theNormalUserProfileUnfollowURL)

    // Makes sure that no changes are made if the request was not successfull
    if (responseData === null) {
        console.log("FAILED from id user: you might not have successfolly unfollowed:") // print to self
        return null
    }

    const index = loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.findIndex((id) => id === username)

    loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.splice(index, 1)
    emit("followersMinus")
}

/**
 * Follows the user
 * 
 * @param username The username of the user that is going to be followed
 */
const followUser = async (username: string) => {
    const theNormalUserProfileFollowURL = urls.users.user.follow(username);

    const responseData = await getFollowUser(theNormalUserProfileFollowURL)

    // Makes sure that no changes are made if the request was not successfull
    if (responseData == null) {
        return null
    }

    loggedInUserStore.idArrayOfLoggedInUserFollowingUsers.push(username)
    emit("followersPluss")

}

</script>

<style scoped></style>