import FeedTopChoice from '~/components/modules/Blogg/FeedTopChoice.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseButton from '~/components/base/BaseButton.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(FeedTopChoice, {
        global: {
            plugins: [pinia],
            components: {
                BaseButton
            },
            mocks: {},
            stubs: {},
        },
        props: {
            followingSelected: true
        },
        slots: {}
    })
};

describe('', () => {

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
    test('Should render two (base)buttons', () => {
        const buttons = wrapper.findAllComponents({ name: "BaseButton" })

        expect(buttons).toHaveLength(2)
    })

    test('Should match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
});