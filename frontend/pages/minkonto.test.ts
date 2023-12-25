import minkonto from './minkonto.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;
let postStore:any;
let loggedInUserStore:any;
let pinia = createTestingPinia()
let mockUpdateBio = vi.fn()

const factory = () => {
    return shallowMount(minkonto, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {
                updateBio:mockUpdateBio
            },
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('testing the minkonto page', () => {

    beforeEach(() => {
        postStore = usePostStore(pinia)
        loggedInUserStore = useLoggedInUserStore(pinia)

        vi.stubGlobal("definePageMeta", () => {
            return null
        })

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
        vi.clearAllMocks()

    });

    test('Should exist', async () => {
        postStore.loggedInUserPosts = true
        loggedInUserStore.loggedInUserProfile = true
        wrapper = factory()
        
        await wrapper.vm.$nextTick()
        
        expect(wrapper.exists()).toBe(true)
    })
    
});