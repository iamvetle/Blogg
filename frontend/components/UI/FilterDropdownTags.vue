<template>
    <div>
        <USelectMenu :options="options" v-model="selected" multiple placeholder="Filter with tags"
            class="text-primary" size="lg"
            
            >
            <template #leading>
                <Icon name="filter" />
            </template>


            <!-- When closed -->
            <template #label>
                <div class="ms-2">

                    <span v-if="selected.length" class="truncate">{{ selected.join(', ') }}</span>
                    <span v-else>Select tags</span>
                </div>

            </template>

            <!-- The options when open-->
            <template #option="{ option: tag }">
                <div class="">
                    <span class="truncate">{{ tag }}</span>
                </div>
            </template>

        </USelectMenu>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["output"])

defineProps<{
    options:string[]
}>()

const selected = ref([])

/** Emits whenever a tag is selected or unselected */
watch(selected, (newValue, oldValue) => {
    // Your logic when 'selected' changes
    emit("output", newValue);
}, { deep: true, immediate: true });




</script>

<style scoped></style>