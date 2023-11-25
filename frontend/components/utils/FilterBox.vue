<template>
  <div v-for="option in props.listOfOptions" :class="props.class" class="w-full">
    <span>
      <InputCheckbox v-model="selected[option]" @update:model-value="updateList" :key="option" :label="option"
        v-bind="$attrs" />
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * FilterBox Component
 * 
 * This component renders a list of options as checkboxes. It allows the user to select multiple options from a given list.
 * Each option is rendered using the InputCheckbox component. The component emits an 'output' event with the selected items.
 * 
 * @component
 * @example <caption>Basic usage:</caption>
 * <FilterBox :listOfOptions="['Option 1', 'Option 2', 'Option 3']" />
 * 
 * @example <caption>With custom class:</caption>
 * <FilterBox :listOfOptions="['Option 1', 'Option 2']" class="custom-class" />
 */


 /**
  * ! am I using this component? if i am: change and fix the innherting and $attrs problem
  */

// defineOptions({
//   inheritAttrs:false
// })


const selected = ref<any>({});

const emit = defineEmits(['output']);

/**
 * Computed property that returns an array of selected items.
 * @returns {Array} An array containing the keys of the checked checkboxes.
 */
const selectedItems = computed(() => {
  const onlyTrueList = [];
  for (const [key, value] of Object.entries(selected.value)) {
    if (value === true) {
      onlyTrueList.push(key);
    }
  }
  return onlyTrueList;
});

/**
 * Updates the list of selected items and emits them.
 */
const updateList = () => {
  emit('output', selectedItems.value);
};

const props = defineProps<{
  /**
   * Array of options to be displayed as checkboxes.
   * @type {Array<string>}
   */
  listOfOptions: string[],

  /**
   * Optional CSS class for the wrapper element.
   * @type {string}
   * @default undefined
   */
  class?: string,

  /**
   * Optional CSS class for the input elements.
   * @type {string}
   * @default undefined
   */
  inputClass?: string,
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
