import MyProfilePicture from './MyProfilePicture.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import BaseImage from '~/components/base/BaseImage.vue';

import { useLoggedInUserStore } from '~/store/loggedInUserStore';

import UploadImage from '~/components/form/UploadImage.vue';

let wrapper: any;
let pinia: any = createTestingPinia();

let loggedInUserStore:any;
const mockProfile_picture = "~/src/picture.jpeg"

const factory = () => {
    return shallowMount(MyProfilePicture, {
        global: {
            plugins: [pinia],
            components: {
                BaseImage,
                UploadImage
            },
            mocks: {},
            stubs: {
                BaseImage: true,
                UploadImage:true
            },
        },
        slots: {}
    })
};

describe('Testing the myprofilepicture component', () => {

    beforeEach(() => {
        loggedInUserStore = useLoggedInUserStore(pinia);
        loggedInUserStore.loggedInUserProfile = {
            profile_picture: mockProfile_picture
        }

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
    test('Should have the basimage component', () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: "BaseImage" }).exists()).toBe(true)
    })
    test('The baseimage component should be get a source attributed ', () => {
        wrapper = factory()

        const baseImage = wrapper.findComponent({ name: "BaseImage" })

        expect(baseImage.attributes("src")).toBeTruthy()
    })
    test('The baseimage component the source attribute to get the right value ', () => {
        wrapper = factory()

        const baseImage = wrapper.findComponent({ name: "BaseImage" })

        expect(baseImage.attributes("src")).toBe(mockProfile_picture)
    })
    test('baseimage should get the placeholder image if the logged in user store does not have a truthy profile picture', async () => {
        wrapper = factory();

        ;loggedInUserStore.loggedInUserProfile = {
            profile_picture:null
        }
        
        await wrapper.vm.$nextTick()

        const baseImage = wrapper.findComponent({ name: "BaseImage" })

        expect(baseImage.attributes("src")).not.toBe(mockProfile_picture)
        expect(baseImage.attributes("src")).toBe(wrapper.vm.placeholder)
    })
    test('Should match snapshot', () => {
      wrapper = factory()

      expect(wrapper).toMatchSnapshot()
    })
    test('Should have the uploadimage component', async () => {
        wrapper = factory()

        ;loggedInUserStore.loggedInUserProfile = {
            profile_picture:null
        }

        await wrapper.vm.$nextTick()
        
        expect(wrapper.findComponent({ name:"UploadImage" }).exists()).toBe(true)
      
    })
    test('Should have the uploadimage component', async () => {
        wrapper = factory()

        ;loggedInUserStore.loggedInUserProfile = {
            profile_picture:"something"
        }

        await wrapper.vm.$nextTick()


        expect(wrapper.findComponent({ name:"UploadImage" }).exists()).toBe(false)
      
    })

});