<template>
    <div id="navbar" class="w-full text-white h-[50px] bg-blue-500">
        <div v-if="isAuthenticated" class="h-full flex justify-between items-center">
            <div id="logo" class="ms-3">
                <nuxt-link to="/">
                    <img src="~/assets/noimage.jpg" alt="The Blog - logo" class="w-auto h-[35px]">
                </nuxt-link>
            </div>
            <ul class="flex space-x-6 me-7 text-sm">
                <nuxt-link to="/kontakt/">
                    <li class="hover:text-yellow-300">Kontakt</li>
                </nuxt-link>
                <nuxt-link to="/om-oss/">
                    <li class="hover:text-yellow-300">Om oss</li>
                </nuxt-link>
                <nuxt-link to="/newpost/">
                    <li class="hover:text-yellow-300">Nytt innlegg</li>
                </nuxt-link>
                <nuxt-link to="/myuser/">
                    <li class="hover:text-yellow-300">Min Side</li>
                </nuxt-link>
                <nuxt-link to="/loggut/">
                    <li class="hover:text-yellow-300">Logg ut</li>
                </nuxt-link>
            </ul>
        </div>
        <div v-else class="h-full flex justify-between items-center">
            <div id="logo" class="ms-3">
                <nuxt-link to="/">
                    <img src="~/assets/noimage.jpg" alt="The Blog - logo" class="w-auto h-[35px]">
                </nuxt-link>
            </div>
            <ul class="flex space-x-6 me-7 text-sm">
                <nuxt-link to="/kontakt/">
                    <li class="hover:text-yellow-300">Kontakt</li>
                </nuxt-link>
                <nuxt-link to="/om-oss/">
                    <li class="hover:text-yellow-300">Om oss</li>
                </nuxt-link>
                <nuxt-link to="/registrer/">
                    <li class="hover:text-yellow-300">Registrer</li>
                </nuxt-link>
                <nuxt-link to="/login/">
                    <li class="hover:text-yellow-300">Logg inn</li>
                </nuxt-link>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts"> // Used by mainpage.vue - for feed

const isAuthenticated = ref(false)

function checkToken() {
    const token = localStorage.getItem("token")
    if (token !== null) {
        isAuthenticated.value = true
        console.log(isAuthenticated.value)
    }
}

onMounted(checkToken)

</script>

<style scoped>

</style>

