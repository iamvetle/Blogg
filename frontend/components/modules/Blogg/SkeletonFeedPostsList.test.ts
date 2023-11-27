import SkeletonFeedPostsList from './SkeletonFeedPostsList.vue'
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(SkeletonFeedPostsList, {
        global: {
            plugins: [],
            components: {
            },
            mocks: {},
            stubs: {
                FeedPostPreviewCard: true,
                "v-skeleton-loader": true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the skeleton of the feedpostslist', () => {
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
    test('Should have the PostPreviewCard component', () => {
        wrapper = factory()

        const postPreviewCard = wrapper.findComponent({ name: "FeedPostPreviewCard" })
        expect(postPreviewCard.exists()).toBe(true)

        // there should be 10 skeleton cards
        const numOfPreviewCards = wrapper.findAllComponents({ name: "FeedPostPreviewCard" })
        expect(numOfPreviewCards).toHaveLength(10)

    })

});