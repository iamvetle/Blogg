import Username from './Username.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const standardUsername = "testusername"

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(Username, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            username: standardUsername
        },
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

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should have the username prop', () => {
        wrapper = factory()

        expect(wrapper.props("username")).toBeTruthy()
    })
    test('Should render the username prop', () => {
        wrapper = factory()

        expect(wrapper.text()).toContain(standardUsername)
    })
});