<template>
  <div class="flex">

    <form @submit.prevent method="post" class="flex flex-col" enctype="multipart/form-data">

      <label for="name">Name:</label>
      <input type="text" name="name" id="name">

      <label for="email">Email</label>
      <input type="email" name="email" id="email">

      <label for="message">Message:</label>
      <textarea name="message" id="" cols="30" rows="10" placeholder="Write a message here"></textarea>

      <label for="file">File:</label>
      <input type="file" name="file" id="file">

      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<script setup lang="ts">
onMounted(() => {

  const form = document.querySelector("form")

  form?.addEventListener("submit", (e: any) => {


    const formData = new FormData(form)

    for (let item of formData) {
      console.log(item[0], item[1])
    }
    
    // ta axios of prøv fetch her
  })





})

// watchEffect(() => {

// })

</script>

<style scoped></style>