import FeedDropdownFilter from './FeedDropdownFilter.vue'
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(FeedDropdownFilter, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {
                FilterBox:true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing FeedDropdownFilter', () => {

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
      expect(wrapper).toMatchSnapshot()
    })


});