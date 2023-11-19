<template>
    <div class="article" v-for="post in user_posts" :key="post.id">
        <feed-post-preview-card :hide-profile-image="true">

            <template #author v-if="post.author">
                <span>
                    <Name class="font-bold" :first_name="post.author.first_name"
                        :last_name="post.author.last_name" />
                </span>
            </template>

            <template #date_published v-if="post.date_published">
                <span>
                    <p class="font-light" v-text="post.date_published"></p>
                </span>
            </template>

            <template #title v-if="post.title">
                <span @click="redirect_to_post_page(post.id)" class="cursor-pointer">
                    <h3 class="text-[28px] mb-2" v-text="post.title">
                    </h3>
                </span>
            </template>

            <template #content v-if="post.content_snippet">
                <p class="mb-2" v-text="toPlainText(post.content_snippet)">
                </p>
            </template>


            <template #lesmer v-if="post.id">
                <span class="cursor-pointer text-primary hover:text-primaryFixed" @click="redirect_to_post_page(post.id)">
                    Les mer
                </span>
            </template>

            <template #tags v-if="post.tags">
                <span class="me-1" v-for="tag in post.tags">
                    <BaseTag :key="post.id" :text="tag.name" />
                </span>
            </template>

            <template #amount-of-comments v-if="post.num_of_comments !== null">
                <span>{{ post.num_of_comments }} comments</span>
            </template>


            <!-- Save/unsave article icon -->
            <template #save-article-icon v-if="post.id">
                <BaseIconSaveArticleSaved v-if="checkIfPostIsSaved(post.id)" @click="unsave(post.id)" />
                <BaseIconSaveArticleUnSaved v-else @mouseover="color = 'fill-primary'" @mouseleave="color = 'fill-black'"
                    @click="save(post.id)" :fill-color="color" />
            </template>

            <!-- More options Icon -->
            <template #more-options-icon v-if="post.id">
                <BaseIconMoreOptions widthProp="24" heightProp="24" :colorProp="color" @mouseover="color = 'fill-primary'"
                    @mouseleave="color = 'fill-black'" />
            </template>

            <!-- Article Image -->
            <template #article_image v-if="post.id">
                <img :src="post_image" alt="Bilde til artikkel" class="w-full h-auto">
            </template>

        </feed-post-preview-card>

        <hr class="mb-16">
    </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

/**
 * The prop that is received is a list of all of the users posts. This component lists all of those.
 */

defineProps<{
    user_posts: PostSingleType[]
}>();

const loggedInUserStore = useLoggedInUserStore()

/**
 * The component is used inside of the user id page and lists all posts made
 */

/** Stores the color that the bookmark icon is rendered with. */
const color = ref("fill-black")


/**
 * @todo remove this and add the proper pictures made with the post
 * Stores the image that is temporarly being used with each post. The picture from the URL changes dynamically upon each request. 
 */
const post_image = ref('https://picsum.photos/500/300')


/**
 * Navigates, or redirects, the web client to the
 * specific page for the post
 * 
 * @param post - the id of the post
 */
const redirect_to_post_page = async (post: any) => {
    const post_article_page = post

    return await navigateTo(`/post/${post_article_page}`)
}

/** 
 * Takes the HTML input and returns the pure text version of it.
 * 
 * @param raw The raw HTML to be converted
 * @returns The plain text version
 */
const toPlainText = (raw: string) => {
    const div = document.createElement('div')
    div.innerHTML = raw
    return div.textContent || div.innerText
}


/**
 * Unsaves the post from the logged-in user
 * 
 * @param post The post to unsave
 */
const unsave = async (post: number) => {
    const index = loggedInUserStore.idArrayOfSavedPosts.findIndex((id) => id === post)

    loggedInUserStore.idArrayOfSavedPosts.splice(index, 1)

    await getSaveOrUnsavePost(post)
}

/**
 * Saves the post for the logged-in user
 * 
 * @param post The post to be saved
 */
const save = async (post: number) => {

    await getSaveOrUnsavePost(post) // i have to put in a logic that makes it not possible to save a post - it  cancesl if hte status code is not 200
}
</script>

<style scoped></style>