<template>
    <div class="article grid-cols-12 grid gap-8 mb-16">

        <div id="left-col-article" class="col-start-1 col-end-9">
            <span class="flex items-center w-full mb-2">
                <span class="user-picture flex items-center">
                    <img :src="account_picture" alt="Bruker profilbilde" class=" w-6 h-auto me-2">
                </span>
                <span class="flex items-center justify-between w-full">
                    <span class="flex items-center username">
                        <p class=" font-bold">Jon Smith</p>
                    </span>
                    <p class=" font-light">2023-02-11</p>
                </span>
            </span>
            <div class="mb-4 w-full">
                <h3 class=" text-[28px] mb-2">title master grand</h3>
                <p class="mb-2 prose">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, ad, repellendus
                    culpa
                    quod itaque laboriosam odit assumenda, fugit doloremque iste sapiente! Porro voluptas
                    fugit ipsam odio repellat nam cumque consequatur!</p>
                <span class="text-sm  text-primary hover:text-primaryFixed">Les mer</span>
            </div>

            <span class="flex items-center justify-between">
                <span class="flex items-center">
                    <span id="tag" class="text-xs py-1 px-1 bg-primary text-onPrimary rounded-md">Typescript</span>
                </span>

                <span class="flex items-center">
                    <span id="save-article" class="me-2 w-auto h-auto mx-auto flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"
                                fill="black" />
                        </svg>

                    </span>



                    <span id="article-options" class="w-auto h-auto mx-auto flex items-center justify-center">

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"
                                fill="black" />
                        </svg>


                    </span>
                </span>
            </span>
        </div>

        <div id="right-col-article" class="col-span-4 flex items-center justify-center|">
            <img :src="article_image" alt="Bilde til artikkel" class="w-full h-auto">
        </div>

    </div>
</template>

<script setup lang="ts">
import account_picture from '~/assets/account-pin-circle-line.svg'

// temp solution
const article_image = "https://picsum.photos/500/300"


</script>

<style scoped></style>