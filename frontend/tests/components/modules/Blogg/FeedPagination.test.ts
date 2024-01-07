import { createTestingPinia } from '@pinia/testing'
import FeedPagination from '~/components/modules/Blogg/FeedPagination.vue'
import { shallowMount } from '@vue/test-utils'



let paginationStore:any
const pinia = createTestingPinia()
let wrapper: any;

const factory = () => {
    return shallowMount(FeedPagination, {
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
describe("testing Pagniation component", () => {

    beforeEach(() => {
        paginationStore = usePaginationStore(pinia)

        paginationStore.currentPageNumber = 1
        paginationStore.countOfPosts

    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('Should exist', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    })
    


})