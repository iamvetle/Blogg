<template>
    <div>
        <USelectMenu :options="tags" v-model="selected" multiple placeholder="Choose tags"
            class="text-primary" size="lg"
            
            >
            <template #leading>
                <Icon name="filter" />
            </template>
            <template #label>
                <div class="ms-2">

                    <span v-if="selected.length" class="truncate">{{ selected.join(', ') }}</span>
                    <span v-else>Select tags</span>
                </div>

            </template>
            <template #option="{ option: tag }">
                <div class="">
                    <span class="truncate">{{ tag }}</span>
                    <span class="ms-2">({{ tag }})</span>
                </div>
            </template>

        </USelectMenu>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["output"])

const selected = ref([])

const tags = ref<string[]>([])

watchEffect(() => {
    emit("output", selected.value)
})

onMounted(async () => {
    const response = await getAllTags()

    if (response) {

            for (let tag of response) {
                tags.value.push(tag.name)
        }

    }
})

</script>

<style scoped></style>