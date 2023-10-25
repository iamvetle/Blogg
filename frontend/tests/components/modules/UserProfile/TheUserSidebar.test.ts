import TheUserSidebar from '~/components/modules/UserProfile/TheUserSidebar.vue';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';

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
        wrapper = shallowMount(TheUserSidebar, {
            global: {
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

    test('Should render the amount of followers slot', () => {
        expect(wrapper.html()).toContain("<h3>5</h3>")
    })

    test('Should not render content when slot is not given/provided', async () => {
        wrapper.unmount()

        wrapper = shallowMount(TheUserSidebar)

        await wrapper.vm.$nextTick()

        expect(wrapper.html()).not.toContain("<p>This is the slot 'follow_button'</p>")
        expect(wrapper.html()).not.toContain("<h3>5</h3>")

    })

    // i can find the component and checkk the text directly inside because it is using slot ^
});