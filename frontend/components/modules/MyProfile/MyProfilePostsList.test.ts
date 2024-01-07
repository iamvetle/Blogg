import MyProfilePostsList from './MyProfilePostsList.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import MyProfilePostPreviewCard from './MyProfilePostPreviewCard.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore;
let loggedInUserStore: any
let postStore: any
let paginationStore
// let paginationStore; 

/**
 * ? Maybe use this as a kind of integration test - since it lists all the articles
 */

const factory = () => {
    return shallowMount(MyProfilePostsList, {
        global: {
            plugins: [pinia],
            components: { MyProfilePostPreviewCard },
            mocks: {},
            stubs: {
                MyProfilePostPreviewCard: true
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
        postStore = usePostStore(pinia)
        loggedInUserStore = useLoggedInUserStore(pinia)
        paginationStore = usePaginationStore(pinia)

        postStore.loggedInUserPosts = {
            results: true
        }
        loggedInUserStore.loggedInUserProfile = {
            first_name: true
        }

    })

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
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()
    })
})