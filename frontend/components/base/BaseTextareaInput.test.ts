import BaseTextareaInput from './BaseTextareaInput.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';

let wrapper: any;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(BaseTextareaInput, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        attrs: {
            class:"placeholderText"
        },
        props: {},
        slots: {}
    })
};

describe('Testing the textareainput basic component, dump component', () => {

    // vi.stubGlobal('useRoute', () => {
    //     return {
    //         params: {
    //             id: 1
    //         }
    //     }
    // });

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
    test('Should be a textarea element present', () => {
        wrapper = factory()
        expect(wrapper.find("textarea").exists()).toBe(true)
    })
    test('The textarea should have "prop-ish-attrs" working ', async () => {
        wrapper = factory()

        const textarea = wrapper.get("textarea")

        expect(textarea.attributes("class")).toEqual("placeholderText")
    })
    test('There should be a function that is called when textarea gets input', async () => {
        wrapper = factory()

        expect(wrapper.vm.inputChange).toBeDefined()

        const textAreaElement = wrapper.get("textarea")

        wrapper.vm.inputValue = "testtext"
        await wrapper.vm.$nextTick()

        await textAreaElement.trigger("input")

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted("emitInput")).toBeTruthy()
        expect(wrapper.emitted("emitInput")[0]).toEqual(["testtext"]) // can't use toBe() here - i don understand why "no visual difference it said in the error"
    })
});

// toBe() is for direct object comparsion
// toEqual() is for value comparision

