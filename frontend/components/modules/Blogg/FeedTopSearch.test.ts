import FeedTopSearch from './FeedTopSearch.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';
import { useSearchStore } from '~/store/searchStore';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();


let searchStore
const standardSearchPart = "tester om fisker finnes"

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(FeedTopSearch, {
        global: {
            plugins: [pinia],
            components: {

            },
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing the search top of the feed index', () => {
    // });

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        // postStore = usePostStore(pinia); 
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 
        searchStore = useSearchStore()

        searchStore.searchPart = standardSearchPart

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
    test('Should display the text "søkeresultater" if there is a true search value', () => {
        wrapper = factory()

        const searchResults = wrapper.find("[data-test='search-results']")

        // the element existance
        expect(searchResults.exists()).toBe(true)

        // only the text
        expect(searchResults.text()).toContain("Søkeresultater for")

        // text and search value
        expect(searchResults.text()).toBe(`Søkeresultater for '${standardSearchPart}'`)

    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    })


});