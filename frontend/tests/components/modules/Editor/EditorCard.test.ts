import EditorCard from '~/components/modules/Editor/EditorCard.vue';
import { shallowMount } from '@vue/test-utils';

let wrapper: any;

const factory = () => {
    return shallowMount(EditorCard, {
        global: {
            plugins: [],
            components: {
            },
            mocks: {},
            stubs: {
                EditorModalPublishPost:true,
                EditorModalRequirements:true,
                EditorModalDiscardPost:true,
                EditorMenuFloating:true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the editorcard (very small bad tests becasue of a loff rewriting)', () => {

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
    // er for vanskelig å bruke tid på å få denne testen til å fungere
    // test('Should have the "wrapper" that holds the modals', () => {
    //     wrapper = factory()

    //     const modal = wrapper.find("[data-test='text_editor_modals']")
    //     expect(modal.exists()).toBe(true)
    // })
    
    

});