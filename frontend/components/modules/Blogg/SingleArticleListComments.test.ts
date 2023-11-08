import SingleArticleListComments from './SingleArticleListComments.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(SingleArticleListComments, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('', () => {

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        // postStore = usePostStore(pinia); 
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist, all the comments', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })


});