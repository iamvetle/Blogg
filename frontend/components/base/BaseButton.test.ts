import BaseButton from './BaseButton.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const mockTestProp = "propmocktest"
const atr1 = "bg-primary font-bold text-white"
const atr2 = "testbutton"

const factory = () => {
    return shallowMount(BaseButton, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            text:mockTestProp
        },
        attrs: {
            class:atr1,
            id:atr2
        }
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
    test('Should render the text prop', () => {
      expect(wrapper.text()).toContain(mockTestProp)
    })
    test('The button should render the text prop', () => {
        const button = wrapper.get("button[data-test='button']")
        expect(button.text()).toBe(mockTestProp)

    })
    test("Should render the attrs props", () => {
        const button = wrapper.get("button[data-test='button']")

        expect(button.attributes("class")).toBe(atr1)
        expect(button.attributes("id")).toBe(atr2)
    })

});