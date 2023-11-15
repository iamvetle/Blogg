import SinglePostCommentsList from './SinglePostCommentsList.vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import SinglePostCommentSingle from './SinglePostCommentSingle.vue';


let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return mount(SinglePostCommentsList, {
        global: {
            plugins: [pinia],
            components: {
                SinglePostCommentSingle
            },
            mocks: {},
            stubs: {},
        },
        props: {
            comments:[
                {
                    content:"somecontent1",
                    date_published:"01-01-2001",
                    author:"testusername"
                },
                {
                    content:"somecontent2",
                    date_published:"03-12-2012",
                    author:"testbobusername"
                }
            ]
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

    test('Should exist, all the comments', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test("Should have single comment, component", () => {
        wrapper = factory()

        const singlecomment = wrapper.findComponent({ name: "SinglePostCommentSingle" })

        expect(singlecomment.exists()).toBe(true)
    })

    test("Should have list of comments props passed down", () => {

        expect(wrapper.props("comments")).toBeTruthy()
    })
    test("The number of singlecomment instances should be equal to the number of comments", () => {
        
        wrapper = factory()

        const all_comment_components = wrapper.findAllComponents({ name:"SinglePostCommentSingle" })

        // using, 2, because wrapper props here has length 2  
        expect(all_comment_components).toHaveLength(2)
    })
    test("The comments text should be displayed", () => {
        expect(wrapper.html()).toContain("somecontent1")
        expect(wrapper.html()).toContain("somecontent2")
    })
});