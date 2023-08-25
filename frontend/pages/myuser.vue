<template>
    <div v-if="account">
    <div class="bg-gray-100">
    <div class="container mx-auto py-8">
        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div class="col-span-4 sm:col-span-3">
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex flex-col items-center">
                        <img src="~assets/no.png" class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt="avatar">

                        <!-- </img> -->
                        <h1 class="text-xl font-bold">{{ account.first_name }} {{ account.last_name }}</h1>
                        <p class="text-gray-600">{{ account.username }}</p>
                        <div class="mt-6 flex flex-wrap gap-4 justify-center">
                            <nuxt-link to="/newpost"><button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">New post</button></nuxt-link>
                            <button disabled class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">follows</button> <!-- Figure this out later -->
                        </div>
                    </div>
                    <hr class="my-6 border-t border-gray-300">
                    <div class="flex flex-col">
                        <span class="text-gray-600 uppercase font-bold tracking-wider mb-2">Info</span>
                        <ul>
                            <li v-if="account.email" class="mb-2 flex"><p class="font-bold me-2">Epost:</p> {{ account.email }}</li>
                            <li v-if="account.phone_number" class="mb-2"><p class="font-bold me-2">Tlf.nr:</p> {{ account.phone_number }}</li>
                            <li v-if="account.nickname" class="mb-2"><p class="font-bold me-2">Kallenavn:</p> {{ account.nickname }}</li>
                            <li v-if="account.address" class="mb-2"><p class="font-bold me-2">Addresse:</p> {{ account.address }}</li>
                            <li v-if="account.age" class="mb-2"><p class="font-bold me-2">Alder:</p> {{ account.age }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-span-4 sm:col-span-9">
                <div class="bg-white shadow rounded-lg p-6">
                    <h2 class="text-xl font-bold mb-4">Bio</h2>
                    <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
                        vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                        suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
                        et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                        luctus risus rhoncus id.
                    </p>

                    <h2 class="text-xl font-bold mt-6 mb-4">All posts by {{ account.first_name }}</h2>
                    
                    <!-- Post begin -->
                    <div>
                        <PostUser
                        v-for="post in posts"
                        :key="post.id"
                        :postProp="post"
                        :accountProp="account"
                        />
                    </div>
                    <!-- Post end -->
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>





        <nuxt-link to="/newpost"><button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">New post</button></nuxt-link>

</template>

<script setup lang="ts">

// Typescript 'Types'
type AccountType = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    nickname: string;
    age:number;
    address:string;
    phone_number:number;
}

type PostType = {
    id:number;
    title:string;    
    content:string;
    date_published:string;
    last_modified:string;
    author: {
        username:string;
        first_name:string;
        last_name:string;
    };
}

import axios from 'axios'
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '@/store/posts';

const basePostsURL = "http://localhost:8888/api/feed/"
const baseUserInfoURL = "http://localhost:8888/api/myuser/"
const store = useGeneralStore()

const { posts } = storeToRefs(store)
const account = ref<AccountType | null>(null)

function accountError() {
    console.log("The account object is null or undefined")
}

const fetchUserPosts = async () => {
    store.fetchAllPosts()
}

const fetchUserAccount = async () => {
    const response = await store.fetchUserAccount()
    if (response) {
        account.value = response
    }
}

onMounted(fetchUserAccount)
onMounted(fetchUserPosts)

</script>

<style scoped>

</style>