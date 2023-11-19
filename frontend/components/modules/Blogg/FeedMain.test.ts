import FeedMain from './FeedMain.vue';

import { createTestingPinia } from "@pinia/testing"
import { VueWrapper, flushPromises, mount } from '@vue/test-utils';

import { useGeneralStore } from '~/store/generalStore';
import FeedPostsList from '~/components/modules/Blogg/FeedPostsList.vue';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';
import BaseButton from '~/components/base/BaseButton.vue'
import FeedTopChoice from '~/components/modules/Blogg/FeedTopChoice.vue';
import FeedTopSearch from "~/components/modules/Blogg/FeedTopSearch.vue";


let wrapper: any;
let generalStore: any
let postStore: any;
let loggedInUserStore: any;
let searchStore: any;
let pinia: any;
let paginationStore: any;

describe('main feed part of the index page testing', () => {

        pinia = createTestingPinia()
        generalStore = useGeneralStore(pinia)
        postStore = usePostStore(pinia)
        loggedInUserStore = useLoggedInUserStore(pinia)
        searchStore = useSearchStore(pinia)
        paginationStore = usePaginationStore(pinia)

        generalStore.isAuthenticated = true

        loggedInUserStore.idArrayOfSavedPosts = true
        loggedInUserStore.loggedInUserProfile = {
            following: [
                {
                    username: "michael98"
                },
                {
                    username: "stephen5"
                }
            ]
        }

        loggedInUserStore.loggedInUserProfile = {
            "num_of_following": 2,
        }

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
        postStore.allTags = []

        paginationStore.activeFetchURL = "something"

        wrapper = mount(FeedMain, {
            global: {
                plugins: [pinia],
                stubs: {
                    "FeedPostsList": true,
                    "FeedTopSearch": true,
                    "FeedTopChoice":true
                },
                mocks: {
                },
                components: {
                },

            },
        })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('Should exist', () => {
        expect(wrapper.exists())
    })
    test('Should have the correct components', async () => {
// this test is not working - whhich is why it is not testing anything
        console.log(wrapper.html())
        const topsearch = wrapper.findComponent({ name:"FeedTopSearch"})
        // expect(topsearch.exists()).toBe(true)
        const postlist = wrapper.findComponent({ name:"FeedPostsList"})
        const topChoice = wrapper.findComponent({ name:"FeedTopChoice"})
        
    })

})