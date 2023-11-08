import MyProfileArticleCard from './MyProfileArticleCard.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

/**
 * ? Maybe use this as a kind of integration test - since it lists all the articles
 */

const factory = () => {
    return shallowMount(MyProfileArticleCard, {
        global: {
            plugins: [pinia],
            components: { MyProfileArticleCard },
            mocks: {},
            stubs: {
                MyProfileArticleCard:true
            },
        },
        props: {
            post: {
            }
        },
        slots: {}
    })
};

describe('', () => {

    beforeEach(() => {
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
});