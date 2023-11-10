import MyProfileListArticles from './MyProfileListArticles.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import MyProfileArticleCard from './MyProfileArticleCard.vue';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore;
let loggedInUserStore:any 
let postStore: any
// let paginationStore; 

/**
 * ? Maybe use this as a kind of integration test - since it lists all the articles
 */

const factory = () => {
    return shallowMount(MyProfileListArticles, {
        global: {
            plugins: [pinia],
            components: { MyProfileArticleCard },
            mocks: {},
            stubs: {
                MyProfileArticleCard:true
            },
        },
        props: {
            post: {
            }
        },
        slots: {}
    })
};

describe('Testing MyprofileListarticles', () => {

    beforeEach(() => {
        postStore = usePostStore()
        loggedInUserStore = useLoggedInUserStore()

        postStore.loggedInUserPosts = {
            results:true
        }
        loggedInUserStore.loggedInUserProfile = {
            first_name:true
        }
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', async () => {
        wrapper = factory()
        
        await wrapper.vm.$nextTick()

        expect(wrapper.exists()).toBe(true)
    })
});