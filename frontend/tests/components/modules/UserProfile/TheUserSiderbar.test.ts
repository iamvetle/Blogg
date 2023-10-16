import TheUserSidebar from '~/components/modules/UserProfile/TheUserSidebar.vue';
import { VueWrapper, flushPromises, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from '~/store/generalStore';
import BaseFollowButton from '~/components/base/BaseFollowButton.vue';

let followText = ref("")

describe('testign theusersidebar', () => {
    let wrapper: VueWrapper;
    let store: any;

    vi.stubGlobal('hoverAction', () => {
        return null
    })
    vi.stubGlobal('leaveAction', () => {
        return null
    })


    beforeEach(async () => {
        const pinia = createTestingPinia();
        store = useGeneralStore(pinia);

        store.idArrayOfLoggedInUserFollowingUsers = ['hello', 'hello2']

        wrapper = mount(TheUserSidebar, {
            global: {
                plugins: [pinia],
                components: { BaseFollowButton },
                mocks: { followText },
                stubs: {}
            },
            props: {
                username: "testuser",
                num_of_followers: 8
            }
        });

        await flushPromises()

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
        expect(wrapper.html()).toContain("testuser")
        expect(wrapper.html()).toContain("8")
    })

    test('basefollowbutton is being rendered', async () => {
        let followbutton = wrapper.findComponent({ name: 'BaseFollowButton' })

        expect(followbutton.exists()).toBe(true)
    })
    test('following is rendered correctly', async () => {
        followText.value = "Following"

        console.log(wrapper.html())

        await flushPromises()

        expect(wrapper.html()).toContain("Following")
    })
    test('follw is rendered correctly', async () => {
        followText.value = "Follow"

        console.log(wrapper.html())

        await flushPromises()

        expect(wrapper.html()).toContain("Follow")
    })

    // i can find the component and checkk the text directly inside because it is using slot ^
});