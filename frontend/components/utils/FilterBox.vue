<template>
    <div v-for="(option, index) in props.listOfOptions" :class="props.class" class="w-full">
        <span>
            <BaseCheckboxOption v-model="selected[option]" @update:model-value="updateList" :key="index" :label="option" v-bind="$attrs"/>
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
 * I have to use it like this " ... v-model="selected[option]" @update:model-value="updateList" />"
 * so that I don't emit TWICE and then fetch twice
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
    listOfOptions: any,
    class?:string,
    inputClass?:string,
}>();

onMounted(() => {
  console.log('FilterBox component is mounted.');
});

onActivated(() => {
  console.log('FilterBox component is activated.');
});

onUnmounted(() => {
  console.log('FilterBox component is unmounted.');
});

onDeactivated(() => {
  console.log('FilterBox component is deactivated.');
});

</script>

<style lang="scss" scoped></style>