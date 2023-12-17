import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import TheNavbar from '~/components/layout/TheNavbar.vue';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;
const pinia:any = createTestingPinia()
let authStore:any;

const factory = () => {
    return shallowMount(TheNavbar, {
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

describe('Testing the navbar layout element component', () => {

    beforeEach(() => {
        authStore = useAuthStore(pinia)
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
    test('Should have the logged in navbar component show if the user is not logged in', () => {
        wrapper = factory()

        // not authenticated
        expect(wrapper.find("[data-test='logged_in_navbar']").exists()).toBe(false)
        expect(wrapper.find("[data-test='logged_out_navbar']").exists()).toBe(true)
    })
    test('Should render the navbar meant for when the web client is authenticated', async () => {
        wrapper = factory()

        // IS authenticated
        authStore.isAuthenticated = true
        await wrapper.vm.$nextTick()
        
    
        expect(wrapper.find("[data-test='logged_in_navbar']").exists()).toBe(true)
        expect(wrapper.find("[data-test='logged_out_navbar']").exists()).toBe(false)    
        
    })
});