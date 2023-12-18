<script setup>

const options = ["foo", "bar", "fizz"]

const selected = ref([])
</script>

<template>
    <div>
        <USelectMenu :options="options" v-model="selected" multiple placeholder="Filter with tags"
            size="lg" selectClass="bg-primaryContainer text-onPrimaryContainer outline-none"
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
