<template>
    <div>
        <USelectMenu searchable searchable-placeholder="Select tags" class="w-full lg:w-40"
            placeholder="Select a person"
            :options="tagNames"
            v-model="selected"
            />
    </div>
    <pre>{{ selected }}</pre>
</template>

<script setup lang="ts">

const postStore = usePostStore()

const tags = computed<TagType[]>(() => {
    return postStore.allTags || [{ name:"No tags to choose from", post_count:"0" }]
})

const tagNames = computed(() => {
    return tags.value.map(tag => tag.name)
})

const selected = ref([])

</script>

<style scoped></style>