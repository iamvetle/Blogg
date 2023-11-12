<template >
    <!-- Background color -->
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
</template>

<script setup lang="ts">

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
