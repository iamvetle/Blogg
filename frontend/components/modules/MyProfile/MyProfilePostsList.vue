<template>
    <div v-if="postStore.loggedInUserPosts && loggedInUserStore.loggedInUserProfile">
        <div v-if="(postStore.loggedInUserPosts.results) && (loggedInUserStore.loggedInUserProfile.first_name)">
            <h2 class="text-xl text-onPrimary font-bold mt-8 mb-6">
                All posts by {{ loggedInUserStore.loggedInUserProfile.first_name }}
            </h2>
            <!-- This just makes the order be the other way around, BUT it does not deal with
                the amount of posts when it comes to paginations-->
            <div class="flex flex-col-reverse">
                <div v-for="post in postStore.loggedInUserPosts.results">
                    <MyProfilePostPreviewCard :key="post.id" :post="post" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

/**
 * Lists all posts made by the loggedinuser - part of the minkonto page
 */

const loggedInUserStore = useLoggedInUserStore()
const postStore = usePostStore()

</script>

<style scoped></style>