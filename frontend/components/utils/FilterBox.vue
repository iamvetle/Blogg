<template>
    <div>
        <span v-for="(option, index) in props.listOfOptions">
            <BaseCheckboxOption v-model="selected[option]" @change="updateList" :key="index" :label="option" v-bind="$attrs" />
        </span>
        <p>{{ selected }}</p>

        <pre>{{ selectedItems }}</pre>
    </div>
</template>

<script setup lang="ts">

/**
 * Filter box
 * 
 * An array with string should be passed as a prop to this component. It will return the 
 * 
 * The component loops over the items in an array, (props.filter), and display
 * them as checkboxes. 
 * 
 * When the checkboxes are checked they are stored in an array.
 */

/**
 * Stores the list of selected(checked) checkboxes
 */
const selected = ref<any>({})
const emit = defineEmits(['output'])

/**
 * Creates a list of items based ONLY on the items, keys, that have the value, true, checked
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


const props = defineProps<{
    listOfOptions: any
}>();
</script>

<style lang="scss" scoped></style>