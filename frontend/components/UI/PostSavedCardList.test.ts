import PostSavedCardList from './PostSavedCardList.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useLoggedInUserStore } from '~/store/loggedInUserStore';

import PostSavedCard from '~/components/UI/PostSavedCard.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
let loggedInUserStore: any;
// let paginationStore; 

const messageTextNoSavedPosts = "You have no posts saved."

const factory = () => {
    return shallowMount(PostSavedCardList, {
        global: {
            plugins: [pinia],
            components: {
                PostSavedCard
            },
            mocks: {},
            stubs: {
                PostSavedCard: true
            },
        },
        props: {},
        slots: {
            PostSavedCard: "<div></div>"
        }
    })
};

describe('Testing article saved card list', () => {

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        // postStore = usePostStore(pinia); 
        loggedInUserStore = useLoggedInUserStore(pinia);
        // paginationStore = usePaginationStore(pinia); 

        loggedInUserStore.loggedInUserProfile =  {
            saved_posts: [
            {
                post: {
                    id: 2,
                    title: "testtitle1",
                    username: "testuser1"
                }
            },
            {
                post: {
                    id: 3,
                    title: "testtitle2",
                    username: "testuser2"
                }
            }
        ]
    }

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });
    test('Should exist', async () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should have postsavedcard component', () => {
      wrapper = factory()

      const savedCard = wrapper.findComponent({name:"PostSavedCard"})
      expect(savedCard.exists()).toBe(true)
    })
    test('If the user has no saved post not post can be displayed and some text gets displayed', async () => {
        wrapper = factory()

        loggedInUserStore.loggedInUserProfile = {
            saved_posts: 0
        }

        await wrapper.vm.$nextTick()

        expect(wrapper.findAllComponents({ name:"PostSavedCard"})).toHaveLength(0)
        expect(wrapper.text()).toContain(messageTextNoSavedPosts)
    })


});