<template>
    <div id="make-comment" v-if="example_list">
      <InputText v-model="textInput"/>
      <p class="text-black">{{ textInput }}</p>

      <InputTextarea v-model="textareaInput"/>
      <p class="text-black">{{ textareaInput }}</p>

      <InputPassword v-model="passwordInput"/>
      <p class="text-black">{{ passwordInput }}</p>

      <InputCheckbox v-model="checkBoxSingleInput" label="One option"/>
      <p class="text-black">{{ checkBoxSingleInput }}</p>
    
      <!-- Use 'of' if it is an object, and 'in' if it is an array-->
      <div id="multiple_checkboxes" v-for="(tag, index) in example_list">
        <InputCheckbox v-model="selected_object[tag]" :key="index" :label="tag"/>
      </div>
      <p class="text-black">{{ selectedList }}</p>

    </div>

</template>

<script setup lang="ts">
/**
 * This page is just testing how I can use components as 'input' 
 * 
 * All of the ones above are working good.
 */

/**
 * This is the array of items that you want to create a list of checkboxes for
 */
const example_list = ["Hello", "Banana", "Aspergas", "Truth", "Lies"]


const selected_object = ref<any>({})

await getAllTags()

const textInput = ref("")
const textareaInput = ref("")
const passwordInput = ref("")
const checkBoxSingleInput = ref<any>("Single checkbox")

const selectedList = computed(() => {
  let only_true_list = []

  for (let [key, value] of Object.entries(selected_object.value)) {
    if (value === true) {
      only_true_list.push(key)
    }
  }
  
  return only_true_list

})

</script>

<style scoped>

</style>