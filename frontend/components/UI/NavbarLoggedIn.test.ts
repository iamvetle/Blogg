import NavbarLoggedIn from './NavbarLoggedIn.vue'
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { usePostStore } from '../../store/postStore';

let wrapper: any;
let postStore:any
let searchStore:any
let paginationStore:any

const factory = () => {
    return shallowMount(NavbarLoggedIn, {
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