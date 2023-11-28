import SkeletonFeedPostsListSidebar from './SkeletonFeedPostsListSidebar.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(SkeletonFeedPostsListSidebar, {
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

describe('Testing the skeleton loader for the sider for the feed list post', () => {

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
});