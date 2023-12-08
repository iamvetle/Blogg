import EditorCard from '~/components/modules/Editor/EditorCard.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(EditorCard, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing the editorcard (very small bad tests becasue of a loff rewriting)', () => {


    vi.stubGlobal('onBeforeRouteLeave', () => {
        return null
    });

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
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Should have the "wrapper" that holds the modals', () => {
        wrapper = factory()

        expect(wrapper.find("[data-test='text_editor_modals']").exists()).toBe(true)
    })
    
    

});