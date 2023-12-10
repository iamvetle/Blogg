import MyProfileBio from './MyProfileBio.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import InputTextarea from '~/components/form/InputTextarea.vue';

let wrapper: any;
let loggedInUserStore: any;
let abioText = "this is test bio"
let maxlengthTextarea = 275
let pinia:any


const factory = () => {
    return shallowMount(MyProfileBio, {
        global: {
            plugins: [pinia],
            components: {
                InputTextarea
            },
            mocks: {},
            stubs: {
                InputTextarea: true,
                BaseButton: true
            }
        },
        props: {}
    });
}

describe('testing the component containing the bio of the logged in user', () => {

    beforeEach(() => {
        pinia = createTestingPinia()
        loggedInUserStore = useLoggedInUserStore(pinia);

        loggedInUserStore.loggedInUserProfile = {
            bio: "this is test bio"
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
    test('Should have the bio title..', () => {
        wrapper = factory()

        expect(wrapper.text()).toContain("Bio")
    })
    test('Should have an emit event called "bioUpdate"', async () => {
        wrapper = factory()


        await wrapper.vm.emit("bioUpdate")

        expect(wrapper.emitted("bioUpdate")).toBeTruthy()
    })



    // test('there should be a maxcap on the length of the textarea - bio - input', async () => {

    //     const thing = wrapper.find("[data-test='bio_input_output']")
    //     const textAreaInputComponent = thing.findComponent({ name:"InputTextarea "})

    //     expect(textAreaInputComponent.attributes("maxlength")).toBe(maxlengthTextarea)
    // })
    test('Should have a "submit change button" that is not shown when no text from input', async () => {
        wrapper = factory()

        console.log(wrapper.html())


        // there is no text from input
        wrapper.vm.bioText = ""

        await wrapper.vm.$nextTick()

        expect(wrapper.find("[data-test='submit_bio_input_change']").exists()).toBe(false)
    })
    // test('Should have a "submit change button" that is shown usuelly by default', async () => {
    //     wrapper = factory()
    //     console.log(wrapper.html())


    //     // there is no text from input

    //     await wrapper.vm.$nextTick()

    //     expect(wrapper.find("[data-test='submit_bio_input_change']").exists()).toBe(true)
    // })
    test('the "submit change button" should be shown if "showSaveBioInputButton" is true', async () => {
        wrapper = factory()

        // there is text from input
        wrapper.vm.bioText = "something"

        await wrapper.vm.$nextTick()

        expect(wrapper.find("[data-test='submit_bio_input_change']").exists()).toBe(true)
    })
    test('If what is written in input is exactly the same as it is in loggedinuser bio - it has not changed - the button should not appear', async () => {
        
        wrapper = factory()

        // the input text is exactly as the loggedinstore bio text
        wrapper.vm.bioText = abioText

        await wrapper.vm.$nextTick()

        expect(wrapper.find("[data-test='submit_bio_input_change']").exists()).toBe(false)
    })
    // test('Should emit an event when the button is clicked', async () => {
    //     wrapper = factory()

    //     // there is already input from store ^(see above)

    //     expect(wrapper.findComponent({ name: "BaseButton" }).exists()).toBe(true)

    //     await wrapper.vm.$nextTick()

    //     await wrapper.vm.emit("bioUpdate")

    //     // because emit has 2 time earlier as well cuz of watcheffect
    //     expect(wrapper.emitted("bioUpdate")[2]).toEqual([emThing])

    //     // can just do this basically as well
    //     expect(wrapper.emitted("bioUpdate")).toContainEqual([emThing])
    // })
})