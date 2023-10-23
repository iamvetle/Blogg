<template>
    <div >
        <span v-for="(option, index) in props.listOfOptions">
            <BaseCheckboxOption v-model="selected[option]" @change="updateList" :key="index" :label="option" v-bind="$attrs"       
            />
        </span>
        <pre>{{ selected }}</pre>
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

const selectedList = computed(() => {
	return Object.keys(selected.value).filter(key => selected.value[key]);
});

const updateList = () => {
    emit('theSelected', selectedList)
}


const emit = defineEmits([''])


const props = defineProps<{
    listOfOptions:any
}>();
</script>

<style lang="scss" scoped>

</style>