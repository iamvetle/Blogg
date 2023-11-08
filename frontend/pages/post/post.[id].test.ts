import IdVue from './[id].vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from '~/store/generalStore';
import BaseTag from '~/components/base/BaseTag.vue';
import SingleArticleListComments from '~/components/modules/Blogg/SingleArticleListComments.vue';

describe('Testing the single post page', () => {
    let wrapper: VueWrapper;
    let store: any;

    beforeEach(() => {
        vi.stubGlobal('definePageMeta', () => {
            return null
        })
        vi.stubGlobal('useRoute', () => {
            return {
                params: {
                    id: 1
                }
            }
        })
        
        const pinia = createTestingPinia();     
        store = useGeneralStore(pinia);

        wrapper = mount(IdVue, {
            global: {
                plugins: [pinia],
                components: {
                    BaseTag,
                    SingleArticleListComments
                },
                mocks: {},
                stubs: {
                    SingleArticleListComments:true
                }
            },
            props: {}
        });

        (wrapper.vm as any).post = {
            "title": "testitle",
            "author": {
                "username": "testusername",
                "first_name": "testfirstname",
                "last_name": "testlastname"
            },
            "content": "testcontent",
            "date_published": "2022-20-21",
            "tags": [
                "Purple",
                "New",
                "Testing",
            ],
            "categories": [
                "Hope",
                "Children",
                "Equality",
            ]
        }

        wrapper.vm.$nextTick()
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('Should render title', async () => {

        expect(wrapper.text()).toContain("testitle")
    })
    test('Should render username', () => {
        expect(wrapper.text()).toContain("testusername")
    })
    test('Should render content', () => {
        expect(wrapper.text()).toContain("testcontent")
    })
    test('Should render date published', () => {
        expect(wrapper.text()).toContain("2022-20-21")
    })
    test('Should render the tags', () => {
        console.log(wrapper.html())
        expect(wrapper.text()).toContain("Purple")
        expect(wrapper.text()).toContain("New")
        expect(wrapper.text()).toContain("Testing")
    })
    test('Should render the categories', () => {
        console.log(wrapper.html())
        expect(wrapper.text()).toContain("Hope")
        expect(wrapper.text()).toContain("Children")
        expect(wrapper.text()).toContain("Equality")
    })
    test("Should have a div for the comments (component)", () => {
        const comments_place = wrapper.find("[data-test='comments']")

        expect(comments_place.exists()).toBe
    })
    test("Should have a comments title", () => {
        expect(wrapper.text()).toContain("Comments written:")
    })
    test('Should have the listcomments component', () => {
        const listcomments = wrapper.findComponent({ name: "SingleArticleListComments" })
        expect(listcomments.exists()).toBe(true)
    })

});
