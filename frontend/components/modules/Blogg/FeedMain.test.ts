import FeedMain from './FeedMain.vue';

import { createTestingPinia } from "@pinia/testing";

import { shallowMount } from '@vue/test-utils';


let wrapper: any;
let postStore: any;
let loggedInUserStore:any;

let pinia: any;

const factory = () => {

    return shallowMount(FeedMain, {
        global: {
            plugins: [pinia],
            stubs: {
                "FeedPostsList": true,
                "FeedTopSearch": true,
                "FeedTopChoice": true,
            },
            mocks: {
            },
            components: {
            },

        },
    })
}

describe('Testing the main part of the index page', () => {

    pinia = createTestingPinia()

    postStore = usePostStore(pinia)
    loggedInUserStore = useLoggedInUserStore(pinia)

    postStore.posts = {
        results: true
    }

    loggedInUserStore.loggedInUserProfile = true

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('Should exist', () => {
        wrapper = factory()
        expect(wrapper.exists())
    })
    test('If posts and logged in user data has been fetched and is in user store, all components should be shown', async () => {
        
        wrapper = factory()
        // this test is not working - whhich is why it is not testing anything
        console.log(wrapper.html())
        const topsearch = wrapper.findComponent({ name: "FeedTopSearch" })
        expect(topsearch.exists()).toBe(true);

        const postlist = wrapper.findComponent({ name: "FeedPostsList" })
        expect(postlist.exists()).toBe(true);
        
        const topChoice = wrapper.findComponent({ name: "FeedTopChoice" })
        expect(topChoice.exists()).toBe(true)

        const skeletonFeedPostsList = wrapper.findComponent({ name:"SkeletonFeedPostsList" })
        expect(skeletonFeedPostsList.exists()).toBe(false)


    })
    test('If posts and logged in user data hasnt been fetched and is not in the stores, only the feedpostslist should be shown (it is regulating v-if internally)', async () => {

        wrapper = factory()

        postStore.posts = null

        await wrapper.vm.$nextTick()

        
        // this test is not working - whhich is why it is not testing anything
        console.log(wrapper.html())
        const topsearch = wrapper.findComponent({ name: "FeedTopSearch" })
        expect(topsearch.exists()).toBe(false);

        const postlist = wrapper.findComponent({ name: "FeedPostsList" })
        expect(postlist.exists()).toBe(true);
        
        const topChoice = wrapper.findComponent({ name: "FeedTopChoice" })
        expect(topChoice.exists()).toBe(false)
    })

})