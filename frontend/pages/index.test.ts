import index from "./index.vue";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

let wrapper: any;
let pinia: any = createTestingPinia();

// let generalStore;
// let postStore;
// let loggedInUserStore;
// let paginationStore;

const factory = () => {
    return shallowMount(index, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {
                FeedMain:true,
                FeedSidebar:true
            },
        },
        props: {},
        slots: {},
    });
};

describe("Testing the index page", () => {

    beforeEach(() => {
        vi.stubGlobal("definePageMeta", () => {
            return null;
        });
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test("Should exist", () => {
        wrapper = factory();

        expect(wrapper.exists()).toBe(true);
    });
    test('Should have the FeedMain component', () => {
        wrapper = factory()

        expect(wrapper.findComponent({ name:"FeedMain"}).exists()).toBe(true)
    })
    test('Should have the FeedSidebar component', () => {
        wrapper = factory()

        expect(wrapper.findComponent({ name:"FeedSidebar"}).exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })
    
});
