<template>
    <div>
        <span v-for="(option, index) in props.listOfOptions">
            <BaseCheckboxOption v-model="selected[option]" @change="updateList" :key="index" :label="option" v-bind="$attrs" />
        </span>
    </div>
</template>

<script setup lang="ts">
/**
 * Filter box
 * 
 * @var props.listOfoptions - An array with strings should be passed as a prop to this component. 
 * 
 * Each item in the array will be displayed as a checkbox option.
 * 
 * @updateList - The event will return an array back with only the selected items, the boxes
 * that is checked.
 * 
 */

/**
 * Stores the list of selected items
 * 
 * in a { "item": true/false } state
 */
const selected = ref<any>({})
const emit = defineEmits(['output'])

/**
 * Returns a computed propety array containing only the items that are selected
 * @returns A list of the checked checkboxes
 */
const selectedItems = computed(() => {
    let only_true_list = []

    for (let [key, value] of Object.entries(selected.value)) {
        if (value === true) {
            only_true_list.push(key)
        }
    }
    return only_true_list
})

const updateList = () => {
    emit('output', selectedItems)
}

/**
 * The prop contains an array of all of the options that can be selected from
 */
const props = defineProps<{
    listOfOptions: any
}>();

</script>

<style lang="scss" scoped></style>