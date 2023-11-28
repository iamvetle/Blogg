import UserSidebar from '~/components/modules/UserProfile/UserSidebar.vue';
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
        wrapper = shallowMount(UserSidebar, {
            global: {
                stubs: {}
            },
            props: {
                username: "testuser",
                profilePicture: "~/path/to/profile_picture.jpg"
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

        wrapper = shallowMount(UserSidebar)

        await wrapper.vm.$nextTick()

        expect(wrapper.html()).not.toContain("<p>This is the slot 'follow_button'</p>")
        expect(wrapper.html()).not.toContain("<h3>5</h3>")

    })

    test("Should have a profile picture prop", () => {
        // arrange?

        // act?

        // Assert
        
        expect(wrapper.props("profilePicture")).toBeTruthy() // Basically, checks if the component HAS a prop named that
        expect(wrapper.props("profilePicture")).toEqual("~/path/to/profile_picture.jpg") // Asserts that the prop contains what we actually told the prop to contain
    })

    test('Should render the profile picture if there is a profile picture', () => {
        
        // Arrange
        let image = wrapper.get('img[id="profile-picture"]');
        // act?

        // Assert
        expect(image.attributes("src")).toBe("~/path/to/profile_picture.jpg")

    })
    test("Should render temporary profile image if no profile picture prop is provided", async () => {
        await wrapper.unmount()

        // Arrange
        
        /** Makes a new wrapper that this time doesnt have a profilePicture prop */
        wrapper = shallowMount(UserSidebar, {
            props: {
                username: "test_username",
            }
        })

        await wrapper.vm.$nextTick()
        ;(wrapper.vm as any).placeholder = "placeholderImage"

        await wrapper.vm.$nextTick()
        
        let image = wrapper.get("img(id='profile-picture')")

        // act?

        // Arrange

        expect(image.attributes("src")).toBe("placeholderImage")

    })

    // i can find the component and checkk the text directly inside because it is using slot ^
});