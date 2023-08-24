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
                            <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
                            <a href="#" class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                        </div>
                    </div>
                    <hr class="my-6 border-t border-gray-300">
                    <div class="flex flex-col">
                        <span class="text-gray-600 uppercase font-bold tracking-wider mb-2">Info</span>
                        <ul>
                            <li class="mb-2">Epost: {{ account.email }}</li>
                            <li class="mb-2">Tlf.nr: {{ account.phone_number }}</li>
                            <li class="mb-2">Kallenavn: {{ account.nickname }}</li>
                            <li class="mb-2">Addresse: {{ account.address }}</li>
                            <li class="mb-2">Alder: {{ account.age }}</li>
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

                    <h2 class="text-xl font-bold mt-6 mb-4">Posts</h2>
                    
                    <!-- Post begin -->
                    <div class="mb-6">
                        <div class="flex justify-between">
                            <span class="text-gray-600 font-bold">Web Developer</span>
                            <p>
                                <span class="text-gray-600 mr-2">date published: </span>
                                <span class="text-gray-600">-(put here)</span>
                            </p>
                        </div>
                        <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                            tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                            suscipit.
                        </p>
                    </div>
                    <!-- Post end -->
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>





        <nuxt-link to="/newpost"><button class="border py-1 px-2">Create new post</button></nuxt-link>

</template>

<script setup lang="ts">
//@ts-nocheck

// Typescript 'Types'
type Account = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    nickname: string;
    age:number;
    address:string;
    phone_number:number;
}

type Post = {
    title: string;
    content:string;
    readonly date_published:string;
    author: {
        username:string;
        first_name:string;
        last_name:string;
    }
}

// -----

import axios from 'axios'

const baseURL = "http://localhost:8888/api/myuser/"
const account = ref<null | Account>(null)

function accountError() {
    console.log("The account object is null or undefined")
}



const fetchAllPosts = async () => { 
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get("http://localhost:8888/api/feed/", { 
        headers: {
                'Authorization': `Token ${token}`
            }})
            const data: Post[] = response.data
            console.log("Account information (success): ", data)
                account.value = {
                    title: data.title,
                    content: data.content,
                    date_published: data.date_published,
                    last_modified: data.last_modified,
                    author: data.author,
                }
    } catch {
            console.log("Something happend. Failed to fetch posts.")
    }
}

onBeforeMount( async () => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get("http://localhost:8888/api/myuser/", { 
        headers: {
            'Authorization': `Token ${token}`
        }})
        const data: Account = response.data
        console.log("Account information (success): ", data)
            account.value = {
                username: data.username,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                nickname: data.nickname,
                address: data.address,
                phone_number:data.phone_number,
                age: data.age,
            }
    } catch {
        console.log("Something happend. Failed to fetch user information.")
    }
})
onMounted(fetchAllPosts)

</script>

<style scoped>

</style>