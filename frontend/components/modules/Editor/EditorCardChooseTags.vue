<template>
    <div>
        <USelectMenu searchable searchable-placeholder="Select tags" class="w-full lg:w-40"
            placeholder="Select a person"
            :options="tags"
            v-model="selected"
            />
    </div>
    <pre>{{ selected }}</pre>
</template>

<script setup lang="ts">

// const postStore = usePostStore()
const tagStore = useTagStore()

const tags = computed<string[]>(() => {
    return tagStore.allTagNames || [{ name:"No tags to choose from", post_count:"0" }]
})

const selected = ref([])

</script>

<style scoped></style>