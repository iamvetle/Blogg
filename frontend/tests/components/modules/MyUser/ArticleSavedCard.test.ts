import ArticleSavedCard from '~/components/modules/MyUser/ArticleSavedCard.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

describe('Testing the component "ArticleSavedCard"', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        const pinia = createTestingPinia();

        wrapper = shallowMount(ArticleSavedCard, {
            global: {
                plugins: [pinia],
                components: {},
                mocks: {},
                stubs: {}
            },
            slots: {
                title: "<p>This is the title slot</p>",
                author:"<h2>TheAuthorName</h2>"
            }
        });
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('Should render the title', () => {
        console.log(wrapper.html())
        expect(wrapper.text()).toContain("This is the title slot")
    })
    test('Should render the name of the author', () => {
        expect(wrapper.text()).toContain("TheAuthorName")
    })

    test('Should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

});