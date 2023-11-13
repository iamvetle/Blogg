import BaseFollowButton from '~/components/base/BaseFollowButton.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from '~/store/generalStore';

describe('testing basefollowbutton', () => {
    let wrapper: VueWrapper;
    let store: any;

    beforeEach(() => {
        const pinia = createTestingPinia();
        store = useGeneralStore(pinia);


        wrapper = shallowMount(BaseFollowButton, {
            global: {
                plugins: [pinia],
                components: {},
                mocks: {},
                stubs: {}
            },
            props: {},

        });
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('component exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('This snapchot works?', () => {
        expect(wrapper).toMatchSnapshot()      
    })
});