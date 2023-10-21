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
            },
            slots: {
                "follow-button": "<p>This is the slot 'follow_button'</p>",
                "amount-of-followers": "<h3>5</h3>"
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

    test('Should render the username', () => {
        expect(wrapper.html()).toContain("testuser")
    })

    test('Should render the "follow_button" slot', () => {
        expect(wrapper.html()).toContain("<p>This is the slot 'follow_button'</p>")
    })

    // i can find the component and checkk the text directly inside because it is using slot ^
});