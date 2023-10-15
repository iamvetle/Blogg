import TheUserSidebar from '~/components/modules/UserProfile/TheUserSidebar.vue';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from '~/store/generalStore';
import BaseFollowButton from '~/components/base/BaseFollowButton.vue';

describe('testign theusersidebar', () => {
    let wrapper: VueWrapper;
    let store: any;

    beforeEach(() => {
        const pinia = createTestingPinia();
        store = useGeneralStore(pinia);

        let basebuttonText = "Follow"

        wrapper = shallowMount(TheUserSidebar, {
            global: {
                plugins: [pinia],
                components: { BaseFollowButton },
                mocks: { basebuttonText },
                stubs: {}
            },
            props: {
                username:"testuser",
                num_of_followers:8
            }
        });

        flushPromises()
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('component exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    test('props are being rendered', () => {
      expect(wrapper.text()).toContain("testuser")
      expect(wrapper.text()).toContain("8")
    })

    test('basefollowbutton is being rendered', async () => {
        let followbutton = wrapper.findComponent({ name: 'BaseFollowButton' })

        expect(followbutton.exists()).toBe(true)
    })
    test('the prop is rendered correctly', () => {
        console.log(wrapper.html())

        expect(wrapper.html()).toContain("Follow")
    })

    // i can find the component and checkk the text directly inside because it is using slot ^
});