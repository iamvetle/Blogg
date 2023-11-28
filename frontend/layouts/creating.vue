<template >
    <!-- Background color -->
    <div id="modal" :class="generalStore.backgroundForModal">

    <div id="site-wrapper">
        <ClientOnly>
            <TheNavbar />
        </ClientOnly>
        <main>
            <div>
                <slot />
            </div>
        </main>
        <TheFooter />
    </div>
</div>
</template>

<script setup lang="ts">
import { useGeneralStore } from '~/store/generalStore';

const generalStore = useGeneralStore()

</script>

<style scoped>
#site-wrapper {
    background-color: #F0F2F2;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
}
</style>
