import PopupModal from './PopupModal.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;
let isOpenProp = true

let confirmTextProp = "Accept"
let abortTextProp = "Decline"

const factory = () => {
    return shallowMount(PopupModal, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            isOpen: isOpenProp,
            confirmText: confirmTextProp,
            abortText: abortTextProp
        },
        slots: {},
    })
};

describe('Testing the popup modal', () => {

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

    test('Should exist', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should have an emit that is supposed to sent a "confirm" message uppwards when confirm button is pressed', async () => {
        wrapper = factory()

        const confirmButton = wrapper.find("[data-test='do_confirm_option']")
        await confirmButton.trigger("click")


        expect(wrapper.emitted("confirm")).toBeTruthy()
    })
    test('Should have an emit that is supposed to sent a "abort" message uppwards when abort button is pressed', async () => {
        wrapper = factory()

        const abortButton = wrapper.find("[data-test='do_abort_option']")

        await abortButton.trigger("click")

        expect(wrapper.emitted().abort).toBeTruthy()
    })
    test('Should have an "confirm" prop being rendered when passed', () => {
        wrapper = factory()

        expect(wrapper.props("confirmText")).toBeTruthy()
        const textProp = wrapper.props("confirmText")

        expect(wrapper.html()).toContain(textProp)

})
test('Should have an "abort" prop being rendered when passed', () => {
    wrapper = factory()

    expect(wrapper.props("abortText")).toBeTruthy()

    const abortText = wrapper.props("abortText")

    expect(wrapper.html()).toContain(abortText)
})
test('If there is not confirm prop provided "confirm", and "abort" should just be rendered', async () => {
    wrapper = shallowMount(PopupModal, {
        props:{
            isOpen:true
        }
    })

    console.log(wrapper.html())
    

    expect(wrapper.html()).toContain("Confirm")
    expect(wrapper.html()).toContain("Abort")
})
 


});