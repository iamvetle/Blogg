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
        </div>
        <div id="list-options">
            <span class="option-holder">
                <EditorButton data-test="bullet_list" :icon="bullet_list_icon" alt="Unordered list" />
            </span>
            <span class="option-holder">
                <EditorButton data-test="number_list" :icon="number_list_icon" alt="Ordered list" />
            </span>
        </div>
        <span class="option-holder">
            <EditorButton data-test="image_option" :icon="image_add_icon" alt="Add image"/>
        </span>
        
    </div>
</template>

<script setup lang="ts">

import underline_icon from '~/assets/icons/underline.svg'
import italic_icon from '~/assets/icons/italic.svg'
import bold_icon from '~/assets/icons/bold.svg'
import bullet_list_icon from '~/assets/icons/bullet_list.svg';
import number_list_icon from '~/assets/icons/number_list.svg'
import image_add_icon from '~/assets/icons/image-add-line.svg'

</script>

<style scoped></style>