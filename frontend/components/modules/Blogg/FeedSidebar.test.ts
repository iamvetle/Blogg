import FeedSidebar from './FeedSidebar.vue';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '~/store/authStore';
import type { FeedSidebarNotAuthenticated } from '#build/components';

let wrapper: any;
let pinia: any = createTestingPinia();                  

// let generalStore; 
let loggedInUserStore: any
let authStore:any

const factory = () => {
    return shallowMount(FeedSidebar, {
        global: {
            plugins: [pinia],
            components: {
            },
            mocks: {},
            stubs: {
                FeedSidebarNotAuthenticated: true,
                FeedPostsListSidebar: true,
                SkeletonFeedPostsListSidebar: true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the sidebar of the feed', () => {

    beforeEach(() => {

    });

    /**
     * * cant really test anything because of the Suspense element
     */
    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper).toMatchSnapshot()

    })

});