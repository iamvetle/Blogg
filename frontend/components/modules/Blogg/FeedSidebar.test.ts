import FeedSidebar from './FeedSidebar.vue';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';


let wrapper: any;
let pinia: any = createTestingPinia();                  

// let generalStore; 
let loggedInUserStore: any

const factory = () => {
    return shallowMount(FeedSidebar, {
        global: {
            plugins: [pinia],
            components: {
            },
            mocks: {},
            stubs: {
                FeedDropdownFilter: true,
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

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should render the the feedpostsidebar', async () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: 'Suspense' }).exists()).toBe(true);
        await wrapper.vm.$nextTick();

        // expect(wrapper.findComponent({ name: 'FeedPostsListSidebar' }).exists()).toBe(true);
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper).toMatchSnapshot()

    })

});