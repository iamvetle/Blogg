import UserSidebar from './UserSidebar.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

import placeholder_user_profile_picture from '~/assets/placeholder-profile-picture.png'

let wrapper: any;

let profilePictureProp = "src/image.jpg"
let usernameProp = "testUsername"

let amountOfFollowersSlot = "28"
let followButtonSlot = "<button>Testbutton</button>"
let bioSlot = "some test bio for slot"

const factory = (data?: any) => {
    return shallowMount(UserSidebar, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {
                BaseImage: true
            },
        },
        props: data,
        slots: {
            "amount-of-followers": amountOfFollowersSlot,
            "follow-button": followButtonSlot,
            "bio":bioSlot
        }
    })
};

describe('Testing the user sidebar component', () => {

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        // postStore = usePostStore(pinia); 
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });
    test('Should exist', async () => {
        wrapper = factory({
            username:usernameProp
        })

        expect(wrapper.exists()).toBe(true)
    })
    test('Should have the BaseImage component', () => {
        wrapper = factory({
            username: usernameProp
        })
        const baseImage = wrapper.findComponent({ name: "BaseImage" })
        expect(baseImage.exists()).toBe(true)
    })
    test('The image should get the placeholder image when no prop is provided', () => {
        wrapper = factory({
            username: usernameProp
        })
        const baseImage = wrapper.findComponent({ name: "BaseImage" })
        expect(baseImage.attributes("src")).toBe(placeholder_user_profile_picture)
    })
    test('The image should render (have the src of) the provided image prop', () => {
        wrapper = factory({
            username: usernameProp,
            profilePicture: profilePictureProp,
        })
        const baseImage = wrapper.findComponent({ name: "BaseImage" })
        expect(baseImage.attributes("src")).toBe(profilePictureProp)
    })
    test('Should render the input of the three slots', () => {
        wrapper = factory({
            username: usernameProp,
            profilePicture: profilePictureProp,
        })
        expect(wrapper.html()).toContain(amountOfFollowersSlot)
        expect(wrapper.html()).toContain(followButtonSlot)
        expect(wrapper.html()).toContain(bioSlot)


    })


});