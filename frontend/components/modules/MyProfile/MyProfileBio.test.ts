import MyProfileBio from './MyProfileBio.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import InputTextarea from '~/components/form/InputTextarea.vue';

let wrapper: any;
let loggedInUserStore: any;
let abioText = "this is test bio"

describe('testing the component containing the bio of the logged in user', () => {

    beforeEach(() => {
        const pinia = createTestingPinia();
        loggedInUserStore = useLoggedInUserStore(pinia);

        loggedInUserStore.loggedInUserProfile = {
            bio: abioText
        }

        wrapper = shallowMount(MyProfileBio, {
            global: {
                plugins: [pinia],
                components: {
                    InputTextarea
                },
                mocks: {},
                stubs: {
                }
            },
            props: {}
        });
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('Should have the bio title..', () => {
        expect(wrapper.text()).toContain("Bio")
    })
    test('Should have an emit event called "bioUpdate"', async () => {
        
        await wrapper.vm.emit("bioUpdate")

        expect(wrapper.emitted("bioUpdate")).toBeTruthy()
    })

    test('Should emit with the correct thing', async () => {
        
        const emThing = "somethingNew"

        wrapper.vm.bioText = emThing
        await wrapper.vm.$nextTick()



        await wrapper.vm.emit("bioUpdate")

        // because emit has 2 time earlier as well cuz of watcheffect
        expect(wrapper.emitted("bioUpdate")[2]).toEqual([emThing])

        // can just do this basically as well
        expect(wrapper.emitted("bioUpdate")).toContainEqual([emThing])
    })
})