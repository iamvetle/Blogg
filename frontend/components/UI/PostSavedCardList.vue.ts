import PostSavedCardList from './PostSavedCardList.vue';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useLoggedInUserStore } from '~/store/loggedInUserStore';

import PostSavedCard from '~/components/UI/PostSavedCard.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(PostSavedCardList, {
        global: {
            plugins: [pinia],
            components: {
                PostSavedCard
            },
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing article saved card list', () => {

    vi.stubGlobal('definePageMeta', () => {
        return null
    });

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        // postStore = usePostStore(pinia); 
        loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

        loggedInUserStore.loggedInUserProfile = [
            {
                post: {
                    id:2,
                    title:"testtitle1",
                    username:"testuser1"
                }
            },
            {
                post: {
                    id:3,
                    title:"testtitle2",
                    username:"testuser2"
                }
            }
        ]

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

});