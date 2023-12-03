import EditorModalPublicationConfirmation from './EditorModalPublicationConfirmation.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import PopupModal from '~/components/utils/PopupModal.vue';

let wrapper: any;

let title = "Do you want to publish the post?"

const factory = () => {
    return shallowMount(EditorModalPublicationConfirmation, {
        global: {
            plugins: [],
            components: {
                PopupModal
            },
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing the modal used when trying to publish a post', () => {

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
    test('Should have an "abort" option', () => {
        wrapper = factory()
        
        const optionsDiv = wrapper.find("[data-test='options']")
        expect(optionsDiv.exists())

        const cancelOption = optionsDiv.find("[data-test='do_abort_option']")
        expect(cancelOption.text()).toBe("Cancel")
    })
    test('Should have an "confirm" option', () => {
        wrapper = factory()
        
        const optionsDiv = wrapper.find("[data-test='options']")
        expect(optionsDiv.exists())

        const confirmOption = optionsDiv.find("[data-test='do_confirm_option']")
        expect(confirmOption.text()).toBe("Confirm")
    })
    test('Should render the title', () => {
        wrapper = factory()      

        const divTitle = wrapper.find("[data-test='modal_title']")

        expect(divTitle.text()).toContain(title)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()
      
    })


});