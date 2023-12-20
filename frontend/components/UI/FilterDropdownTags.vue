<template>
    <div>
        <USelectMenu :options="options" v-model="selected" searchable searchablePlaceholder="Search a tag..." multiple placeholder="Option tags" size="lg"
            selectClass="items-center bg-primaryContainer text-onPrimaryContainer outline-none text-sm">
            <template #leading>
                <Icon name="filter" size="1rem" />
            </template>


            <!-- When closed -->
            <template #label>
                <div class="text-md flex items-center">

                    <span v-if="selected.length" class="break-words">{{ selected.length }} filter</span>
                    <span v-else>Filter</span>
                </div>

            </template>

            <!-- The options when open-->
            <template #option="{ option: tag }">
                <div class="text-sm">
                    <span class="truncate">{{ tag }}</span>
                </div>
            </template>

        </USelectMenu>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    options: string[]
}>()

const emit = defineEmits(["output"])

/** State for all of the selected tags */
const selected = ref([])

/** Emits whenever a tag is selected or unselected */
//@ts-ignore
watch(selected, (newValue, oldValue) => {
    // Your logic when 'selected' changes
    emit("output", newValue);
}, { deep: true, immediate: false });




</script>

<style scoped></style>