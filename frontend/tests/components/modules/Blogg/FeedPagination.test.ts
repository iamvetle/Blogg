import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import FeedPagination from '~/components/modules/Blogg/FeedPagination.vue';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;
let pinia = createTestingPinia()

const factory = () => {
    return shallowMount(FeedPagination, {
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

describe('Testing the feed pagination component', () => {

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
    test('Should have a data-test-wrapper', () => {
        wrapper = factory()

        const dataTest = wrapper.find("[data-test='feed_pagination']")
        expect(dataTest.exists()).toBe(true)
        
    })
    
});