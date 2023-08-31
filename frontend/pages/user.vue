<template>
    <div id="site-wrapper">
        
        <div id="navbar" class="w-full h-[60px] flex justify-end items-center">
            <ul class="flex space-x-5 me-5 items-center">
                <li>Write</li>
                <li>Signup</li>
                <li>Signin</li>
                <li>avatar</li>
            </ul>
        </div>
        
        <div class="w-9/12 mx-auto border-2 pb-[60px]">

            <div class="w-full px-[80px] grid grid-cols-12 gap-[80px]">
            
                <div class="inline-block col-span-8 border-2 border-blue-500"> <!-- 8/12 main content-->
                
                    <div id="header" class="h-[150px] w-full bg-slate-500 border"> <!-- The IMAGE -->
                    </div>

                    
                    <div id="top" class="px-2 pt-[50px]">
                        <div id="heading" class="prose">
                            <h2 class="text-4xl leading-[52px] font-medium tracking-[-0.03em]">Kristoffer Brum</h2>
                        </div>
                        
                        <div class="pt-[30px]">
                            <ul class="flex justify-start items-center space-x-4">
                                <li class="prose">Home</li>
                                <li class="prose">Links</li>
                                <li class="prose">About</li>
                            </ul>
                        </div>
                        <hr class="mt-2">
                        
                    </div>                    
                    <div id="main" class="pt-[50px]">
                        <div class="pb-[40px]">
                            <PostArticle/>
                        </div>
                    </div>
                    
                </div>
            
                <div id="sidebar" class="px-5 col-span-4 border border-red-500"> <!-- 4/12 Sidebar -->
                    <div id="profilbilde" class="w-[80px] h-[80px] rounded-2xl bg-red-200 mt-[40px]  mb-[10px]"></div>

                    <div id="info-wrapper">
                        <p id="username" class="font-bold leading-7">Username</p>
                        <span id="followers"><p class="font-light text-sm leading-7">71M followers</p></span>
                        <div id="bio" class="pt-4 pb-7 text-sm"><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex corrupti tempore nesciunt?</p></div>
                        
                        <span id="follow" class="bg-slate-500 px-3 py-2 rounded-md text-sm">Follow</span>
                        
                        <div id="following" class="pt-10 pb-8">
                            <p class="text-base pb-2">Following:</p>
                            <ul class="pt-2 text-sm">
                                <li class="items-center pt-2">
                                    <span class="items-center">
                                        <img src="@/assets/barack-distorted-img.png" class="w-5 h-5 inline">
                                        <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
                                        <img src="@/assets/three-dots.svg" class="items-center pms-4 inline w-[15px] py-auto">
                                    </span>
                                </li>
                                <li class="items-center pt-2">
                                    <span class="items-center">
                                        <img src="@/assets/barack-distorted-img.png" class="w-5 h-5 inline">
                                        <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
                                        <img src="@/assets/three-dots.svg" class="items-center pms-4 inline w-[15px] py-auto">
                                    </span>
                                </li>
                                <li class="items-center pt-2">
                                    <span class="items-center">
                                        <img src="@/assets/barack-distorted-img.png" class="w-5 h-5 inline">
                                        <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
                                        <img src="@/assets/three-dots.svg" class="items-center pms-4 inline w-[15px] py-auto">
                                    </span>
                                </li>
                                <li class="items-center pt-2">
                                    <span class="items-center">
                                        <img src="@/assets/barack-distorted-img.png" class="w-5 h-5 inline">
                                        <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
                                        <img src="@/assets/three-dots.svg" class="items-center pms-4 inline w-[15px] py-auto">
                                    </span>
                                </li>
                                <li class="items-center pt-2">
                                    <span class="items-center">
                                        <img src="@/assets/barack-distorted-img.png" class="w-5 h-5 inline">
                                        <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
                                        <img src="@/assets/three-dots.svg" class="items-center pms-4 inline w-[15px] py-auto">
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout:"blank"
})

</script>

<style scoped>

</style>