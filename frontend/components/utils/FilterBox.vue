<template>
  <div v-for="option in listOfOptions" :class="class" class="w-full">
    <span>
      <InputCheckbox v-model="selected[option.name]" @update:model-value="updateList" :key="option"
        :label="`${option.name} (${option.post_count})`" />
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
 * * Yes this component is in use 
 */

// defineOptions({
//   inheritAttrs:false
// })

/**
 * Updates the list of selected items and emits them.
 */
const updateList = () => {
  emit('output', selectedItems.value);
};

defineProps<{
  /**
   * Array of options to be displayed as checkboxes.
   */
  listOfOptions: TagType[],
  class?: string,
  inputClass?: string,
}>();

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
