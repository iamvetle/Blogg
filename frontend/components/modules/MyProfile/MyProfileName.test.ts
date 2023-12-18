import MyProfileName from './MyProfileName.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';



let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

let firstNameProp = "FirstTestName"
let lastNameProp = "LastTestName"

// let generalStore; 
let loggedInUserStore;
// let paginationStore; 

const factory = () => {
    return shallowMount(MyProfileName, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing the myprofilename component', () => {

    beforeEach(() => {
        loggedInUserStore = useLoggedInUserStore(pinia);

        loggedInUserStore.loggedInUserProfile = {
            first_name: firstNameProp,
            last_name: lastNameProp
        }
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });
    test('Should render the entire name in a h1 element', () => {
        wrapper = factory()

        const h1Element = wrapper.find("h1")
        expect(h1Element.text()).toBe(`${firstNameProp} ${lastNameProp}`)
    })


});