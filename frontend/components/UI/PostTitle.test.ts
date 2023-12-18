import PostTitle from './PostTitle.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';


let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const classAttr = "testClass"

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(PostTitle, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            title: "testTitle"
        },
        slots: {},
        attrs: {
            class: classAttr
        }
    })
};

describe('', () => {

    vi.stubGlobal('definePageMeta', () => {
        return null
    });

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
    test('Component should have a "title" prop', () => {
        wrapper = factory()
        expect(wrapper.props("title")).toBeTruthy()
    })
    test('Should render the prop, "title"', () => {
        wrapper = factory()
        const titleProp = wrapper.props("title")
        expect(wrapper.text()).toContain(titleProp)
    })
    test('Should have a the h1 element that should have the text', () => {
        wrapper = factory()
        const titleProp = wrapper.props("title")
        const h1 = wrapper.find("h1")
        expect(h1.text()).toContain(titleProp)
    })
    test('Attributes ($attrs) should be on the h1 element', () => {
        wrapper = factory()
        const h1 = wrapper.find("[data-test='title']")
        expect(h1.attributes("class")).toBe(classAttr)
    })

});