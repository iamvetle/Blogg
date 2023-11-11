<template>
    <div id="top-menu-container">
        <div id="top-three">
            <span class="option-holder">
                <EditorButton data-test="bold" :icon="bold_icon" alt="Bold" />
            </span>
            <span class="option-holder">
                <EditorButton data-test="italic" :icon="italic_icon" alt="Italic" />
            </span>
            <span class="option-holder">
                <EditorButton data-test="underline" :icon="underline_icon" alt="Underline" />
            </span>
            <div>
                <span class="option-holder">
                    <EditorButton data-test="bullet_list" :icon="bullet_list_icon" alt="Bullet list" />
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import underline_icon from '~/assets/icons/underline.svg'
import italic_icon from '~/assets/icons/italic.svg'
import bold_icon from '~/assets/icons/bold.svg'
import bullet_list_icon from '~/assets/icons/bullet_list.svg';

</script>

<style scoped></style>