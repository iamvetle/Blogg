import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useSearchStore } from '~/store/searchStore'
import SearchPagination from '~/components/modules/Blogg/SearchPagination.vue'

describe('search pagnation testing', () => {
    let wrapper: VueWrapper;
    let store;
    let pinia;

    beforeEach(async () => {
        pinia = createTestingPinia()
        store = useSearchStore(pinia)

        store.number_of_posts_count = 100;
        store.current_page = 3;
        store.total_pages_count = 203;

        wrapper = mount(SearchPagination, {
            global: {
                plugins: [pinia],
            },
        })

        await wrapper.vm.$nextTick()
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    test('a total of _ posts is NOT rendering', async () => {
        console.log(wrapper.html())
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain("A total of")
    })
    test('current page in pagnation are rendering correctly', async () => {
        await wrapper.vm.$nextTick()

        const current = wrapper.find('[id="current-page"]')
        expect(current.exists()).toBe(true)

        expect(current.text()).toContain(3)
    })
    test('total number of pages is rendering', async () => {
        expect(wrapper.text()).toContain(203)
    })
})