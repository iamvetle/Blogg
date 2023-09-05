<template>
  <div>
    <div class="relative min-h-screen flex">
      <div
        class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-plain"
      >
        <div
          id="background"
          class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-primary-base text-plain bg-no-repeat bg-cover relative"
        >
          <div
            class="absolute bg-gradient-to-b from-primary-base to-primary-high opacity-75 inset-0 z-0"
          ></div>
          <div class="w-full max-w-md z-10">
            <div class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
              The Blogg
            </div>
            <div class="sm:text-sm xl:text-md text-plain font-normal">
              You need an account to be able to view and create posts. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Odit totam quo
              ratione expedita tempora. Eius impedit sequi numquam quas iusto
              quos necessitatibus voluptatibus magnam dolorem ad? Eligendi aut
              aspernatur provident?
            </div>
          </div>
        </div>
        <div
          class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-plain"
        >
          <div class="max-w-md w-full space-y-8">
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#background {
  background-image: url(https://images.unsplash.com/photo-1663344010224-a89a22f14bb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80);
}
</style>
