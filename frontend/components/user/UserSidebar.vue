<template>
<div id="sidebar-component">
    <!-- 4/12 Sidebar -->
    <img
    src="~/assets/no.png"
    id="profilbilde"
    class="w-[80px] h-[80px] mt-[40px] mb-[10px]"
    />

    <div id="info-wrapper">
    <p id="username" class="font-bold leading-7">
        {{ sideBarProp }}
    </p>
    <!-- Through props - not the best-->
    <span id="followers"
        ><p class="font-light text-sm leading-7">{{ followers }} followers</p></span
    >
    <div id="bio" class="pt-4 pb-7 text-sm">
        <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex corrupti
        tempore nesciunt?
        </p>
    </div>

    <span id="follow" :class="followClass"
    @click="followUserAction"
    @mouseover="hoverAction('on')"
    @mouseleave="hoverAction('off')"
    >
        {{ followText }}

    </span>
    <div id="following" class="pt-10 pb-8">
        <p class="text-base pb-2">Following:</p>
        <ul class="pt-2 text-sm">
        <li class="items-center pt-2">
            <span class="items-center">
            <img
                src="~/assets/barack-distorted-img.png"
                class="w-5 h-5 inline"
            />
            <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
            <img
                src="@/assets/three-dots.svg"
                class="items-center pms-4 inline w-[15px] py-auto"
            />
            </span>
        </li>
        <li class="items-center pt-2">
            <span class="items-center">
            <img
                src="@/assets/barack-distorted-img.png"
                class="w-5 h-5 inline"
            />
            <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
            <img
                src="@/assets/three-dots.svg"
                class="items-center pms-4 inline w-[15px] py-auto"
            />
            </span>
        </li>
        <li class="items-center pt-2">
            <span class="items-center">
            <img
                src="@/assets/barack-distorted-img.png"
                class="w-5 h-5 inline"
            />
            <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
            <img
                src="@/assets/three-dots.svg"
                class="items-center pms-4 inline w-[15px] py-auto"
            />
            </span>
        </li>
        <li class="items-center pt-2">
            <span class="items-center">
            <img
                src="@/assets/barack-distorted-img.png"
                class="w-5 h-5 inline"
            />
            <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
            <img
                src="@/assets/three-dots.svg"
                class="items-center pms-4 inline w-[15px] py-auto"
            />
            </span>
        </li>
        <li class="items-center pt-2">
            <span class="items-center">
            <img
                src="@/assets/barack-distorted-img.png"
                class="w-5 h-5 inline"
            />
            <p class="items-center ms-3 me-2 inline text-sm">Barack Obama</p>
            <img
                src="@/assets/three-dots.svg"
                class="items-center pms-4 inline w-[15px] py-auto"
            />
            </span>
        </li>
        </ul>
    </div>
    </div>
</div>
</template>

<script setup lang="ts">
//@ts-nocheck
const { sideBarProp, num_of_followers } = defineProps(["sideBarProp", "num_of_followers"]);
const route = useRoute()
const hover = ref(false)

const followers = ref(num_of_followers)
const followText = ref("Follow")
const followingState = ref(false)

const followClass = ref("bg-secondary-base text-plain px-3 py-2 rounded-md text-sm hover:bg-secondary-low")

const hoverAction = (text) => {
    if ( text === "on" && followingState.value === true && followText.value === "Following") {
        followText.value = "Unfollow"
        followClass.value = "bg-secondary-base text-plain px-3 py-2 rounded-md text-sm hover:bg-warning-low"


    } else if (text === "off" && followingState.value === true && followText.value === "Unfollow") {
        followText.value = "Following"
        followClass.value = "bg-secondary-base text-plain px-3 py-2 rounded-md text-sm hover:bg-secondary-low"

    }
}

const followUserAction = async () => {
const baseURL = `shttp://localhost:8888/api/${sideBarProp}/kunfollow/`

const response = await followUser(baseURL)

if (followingState.value === false ) {
    followText.value = "Following"
    followingState.value = true 
    followClass.value = "bg-secondary-base text-plain px-3 py-2 rounded-md text-sm hover:bg-secondary-low"

} else {
    followText.value = "Follow"
    followingState.value = false
    followClass.value = "bg-secondary-base text-plain px-3 py-2 rounded-md text-sm hover:bg-secondary-low"

}

followers.value++


}

</script>

<style scoped></style>
