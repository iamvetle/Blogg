import FeedSidebarNotAuthenticated from './FeedSidebarNotAuthenticated.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(FeedSidebarNotAuthenticated, {
        global: {
            plugins: [],
            components: {
            },
            mocks: {},
            stubs: {
                UButton:true,
                "nuxt-link":true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the sidebar that is used when the web client isnt logged in/authenticated', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
        vi.clearAllMocks()

    });

    test('Should exist', () => {
        wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })
    
    /**
     * * Doesnt work because it is inside #footer and not just default - and I don't have the "source" for Ucard to be able to test it
     */
    // test('Should render a loggin "button" thing', () => {
    //     wrapper = factory()
    //     console.log(wrapper.html())
        

    //     expect(wrapper.find("[data-test='login_here']").exists()).toBe(true)
    // })
    // test('Should render a register "button" thing', () => {
    //     wrapper = factory()

    //     expect(wrapper.find("[data-test='register_here']").exists()).toBe(true)
    // })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    })
    
});