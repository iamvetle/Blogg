import EditorMenuTop from './EditorMenuTop.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;


const factory = () => {
    return shallowMount(EditorMenuTop, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {
                EditorModalAddURLLink:true,
                EditorButton:true,
                BaseButton:true
            },
        }, // @ts-ignore
        props: {// @ts-ignore // doing this just because I else get a bunch of errors and I am not trying to assert if the buttons - options are there, or doing its job correctly
            editor: false
        },
        slots: {}
    })
};

describe('Testing the top menu for the editor (bad - after rewriting)', () => {

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
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })
    test('Should match html? snapshot', () => {
        wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('The main editor "wrapper" should not include the modal', async () => {
        // checking through data-test

        wrapper = factory()

        // temporarily opening the "showModal" to check that
        wrapper.vm.showModalAddLinkURL = true
        console.log(wrapper.html())
        
        await wrapper.vm.$nextTick()
        
        let modalDataWrapper = wrapper.find("[data-test='modal_for_url_link_add']")
        expect(modalDataWrapper.exists()).toBe(true)

        const mainEditorDataWrapper = wrapper.find("[data-test='top_menu_wrapper']")
        expect(mainEditorDataWrapper.exists()).toBe(true)        
        
        modalDataWrapper = mainEditorDataWrapper.find("[data-test='modal_for_url_link_add']")
        expect(modalDataWrapper.exists()).toBe(false)

    })

});