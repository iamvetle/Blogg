<template>
    <div id="postFormWrapper" class="mt-2 mb-16">
        <div class="max-w-3xl py-4 mx-auto prose">
            <div id="direct-editor">
                <EditorCard
                initialPost="<p>asjdhaksd</p>" 

                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * ! i am not getting this work. especially the when I am trying to pass a prop to set up an intitial so that I can edit it - that doesnt work
 * For editing the post
 */

definePageMeta({
    layout: "default"
})



</script>

<style scoped></style>