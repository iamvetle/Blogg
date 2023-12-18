import UserNav from './UserNav.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(UserNav, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
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
    test('Should render the correct text', () => {
        wrapper = factory()
        
        const home = wrapper.find("[data-test='home']")
        expect(home.exists()).toBe(true)
        expect(home.text()).toBe("Home")

        const links = wrapper.find("[data-test='links']")
        expect(links.exists()).toBe(true)
        expect(links.text()).toBe("Links")

        const about = wrapper.find("[data-test='about']")
        expect(about.exists()).toBe(true)
        expect(about.text()).toBe("About")
    })
});