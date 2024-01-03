import { shallowMount } from '@vue/test-utils';
import FeedTopBarDropdownFilter from '~/components/modules/Blogg/FeedTopBarDropdownFilter.vue';
// import { useSearchStore } from '~/store/searchStore';
import { createTestingPinia } from '@pinia/testing';

let wrapper:any;
let searchStore;
let pinia = createTestingPinia()
let paginationStore = usePaginationStore()

const factory = () => {
    return shallowMount(FeedTopBarDropdownFilter, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
}

describe('Testing the FeedTopBarDropdownFilter component', () => {

    beforeEach(() => {
        searchStore = useSearchStore(pinia)
        paginationStore = usePaginationStore()
        
    })

    it('renders with the correct placeholder', () => {
        wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    });
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    })
    

});
