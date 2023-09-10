<template>
    <div>
        <Pagination
        v-if="pages_count"
        />
    </div>
</template>

<script setup lang="ts">

const previous_p = ref<string | null>(null);
const next_p = ref<string | null>(null);
const pages_count = ref<number | null>(null);


onMounted( async () => {
    try {
        const response = await fetchAllPosts()

        if (response != null) {
            pages_count.value = response.count
            next_p.value = response.next
            previous_p.value = response.previous
        }
    } catch (error) {
        console.log(error)
    }
})
</script>

<style scoped>

</style>