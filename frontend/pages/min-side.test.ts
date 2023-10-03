import { VueWrapper, shallowMount} from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore';
import minSide from '~/pages/min-side.vue';  // dont know why not working
import { fetchPersonalUser } from '../composables/fetchPersonalUser';

vi.stubGlobal('fetchAllFollowers', () => {
    return null
})

vi.stubGlobal('fetchPersonalPosts', () => {
    return null
});

let user = {
    id:3,
    email:"test@example.com",
    username:"test32",
    first_name:"Test",
    last_name:"Testanson",
    age:24,
    address:"Someaddress 7, 4713 City, Country",
    nickname:"Tt",
    last_online:"19-01-2021",
    num_of_followers:4,
};

describe('min-side page testing', () => {
    let wrapper:VueWrapper
    let store;
    let pinia;

    beforeEach( async () => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = shallowMount(minSide, {
            global: {
                plugins: [pinia],
            },
        })

        wrapper.vm.user = user


        await wrapper.vm.$nextTick()
    })

    test('the page exists', () => {
        expect(wrapper.exists()).toBe(true)

    })
    test('all user information fields are rendering', async () => {
        console.log(wrapper.html())
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain("test@example.com")
        expect(wrapper.text()).toContain("test32")
        expect(wrapper.text()).toContain("test")
        expect(wrapper.text()).toContain("Test")
        expect(wrapper.text()).toContain("Testanson")
        expect(wrapper.text()).toContain(24);
        expect(wrapper.text()).toContain("Someaddress 7, 4713 City, Country")
        expect(wrapper.text()).toContain("Tt")
        // expect(wrapper.text()).toContain("19-01-2021") # last_online 
        expect(wrapper.text()).toContain(4)

    })
})