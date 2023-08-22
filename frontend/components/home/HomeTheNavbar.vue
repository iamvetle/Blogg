<template>
    <div id="navbar" class="w-full text-white py-2 px-1 h-[50px] bg-[#823038] flex justify-end items-center">
        <div v-if="isAuthenticated">
            <ul class="flex text-sm">
                <nuxt-link to="/kontakt/">
                    <li class="me-7 hover:text-yellow-300">Kontakt</li>
                </nuxt-link>
                <nuxt-link to="/om-oss/">
                    <li class="me-7 hover:text-yellow-300">Om oss</li>
                </nuxt-link>
                <nuxt-link to="/myuser/">
                    <li class="me-7 hover:text-yellow-300">Min Side</li>
                </nuxt-link>
                <nuxt-link to="/loggut/">
                    <li class="me-7 hover:text-yellow-300">Logg ut</li>
                </nuxt-link>
            </ul>
        </div>
        
        <div v-else>
            <ul class="flex text-sm">
                <nuxt-link to="/kontakt/">
                    <li class="me-7 hover:text-yellow-300">Kontakt</li>
                </nuxt-link>
                <nuxt-link to="/om-oss/">
                    <li class="me-7 hover:text-yellow-300">Om oss</li>
                </nuxt-link>
                <nuxt-link to="/registrer/">
                    <li class="me-7 hover:text-yellow-300">Registrer</li>
                </nuxt-link>
                <nuxt-link to="/login/">
                    <li class="me-7 hover:text-yellow-300">Logg inn</li>
                </nuxt-link>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts"> // Used by mainpage.vue - for feed

const isAuthenticated = ref(false)

function checkToken() {
    if (localStorage.getItem("token") != null) {
        isAuthenticated.value = true
    }
}

onMounted(checkToken)

</script>

<style scoped>

</style>

