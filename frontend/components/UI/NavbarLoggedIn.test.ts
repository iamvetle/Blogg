import NavbarLoggedIn from './NavbarLoggedIn.vue'
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;
let pinia = createTestingPinia()

const factory = () => {
    return shallowMount(NavbarLoggedIn, {
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

describe('Testing the navbar used when the user is logged in', () => {

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
    test('', () => {
        /**
         * ! reminder to continue making test for this one
         */
    })
    
});