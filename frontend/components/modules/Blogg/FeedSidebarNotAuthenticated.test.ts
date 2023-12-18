import FeedSidebarNotAuthenticated from './FeedSidebarNotAuthenticated.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(FeedSidebarNotAuthenticated, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {},
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
    test('Should render a loggin "button" thing', () => {
        wrapper = factory()

        expect(wrapper.find("[data-test='login_here']").exists()).toBe(true)
    })
    test('Should render a register "button" thing', () => {
        wrapper = factory()

        expect(wrapper.find("[data-test='register_here']").exists()).toBe(true)
    })
});