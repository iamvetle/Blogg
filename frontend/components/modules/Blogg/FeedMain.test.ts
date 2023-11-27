import FeedMain from './FeedMain.vue';

import { createTestingPinia } from "@pinia/testing";

import { shallowMount } from '@vue/test-utils';
import { usePostStore } from '~/store/postStore';


let wrapper: any;
let postStore: any;

let pinia: any;

const factory = () => {

    return shallowMount(FeedMain, {
        global: {
            plugins: [pinia],
            stubs: {
                "FeedPostsList": true,
                "FeedTopSearch": true,
                "FeedTopChoice": true,
                SkeletonFeedPostsList:true
            },
            mocks: {
            },
            components: {
            },

        },
    })
}

describe('main feed part of the index page testing', () => {

    pinia = createTestingPinia()

    postStore = usePostStore(pinia)


    postStore.posts = {
        results: [
            {
                title: "testtitle1",
                content: "testcontent1"
            },
            {
                title: "testtitle2",
                content: "testcontent2"
            },
            {
                title: "testtitle3",
                content: "testcontent3"
            }
        ]
    }

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('Should exist', () => {
        wrapper = factory()
        expect(wrapper.exists())
    })
    test('Should have the correct components render when there are posts', async () => {
        
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
    test('If there is not posts the skeleton of the posts list should be rendered instead', async () => {


        wrapper = factory()

        postStore.posts = {
            results: null
        }

        await wrapper.vm.$nextTick()
        
        
        // this test is not working - whhich is why it is not testing anything
        console.log(wrapper.html())
        const topsearch = wrapper.findComponent({ name: "FeedTopSearch" })
        expect(topsearch.exists()).toBe(false);

        const postlist = wrapper.findComponent({ name: "FeedPostsList" })
        expect(postlist.exists()).toBe(false);
        
        const topChoice = wrapper.findComponent({ name: "FeedTopChoice" })
        expect(topChoice.exists()).toBe(false)

        const skeletonFeedPostsList = wrapper.findComponent({ name:"SkeletonFeedPostsList" })
        expect(skeletonFeedPostsList.exists()).toBe(true)





    })

})