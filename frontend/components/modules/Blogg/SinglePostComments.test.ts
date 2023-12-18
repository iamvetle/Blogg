import SinglePostComments from './SinglePostComments.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import SinglePostCommentsList from '~/components/modules/Blogg/SinglePostCommentsList.vue';
import SinglePostCommentAdd from './SinglePostCommentAdd.vue';

let wrapper: any;
let pinia: any = createTestingPinia();

const mockPost = {
    id: 5,
    title: "testtitle",
    author: {
        first_name:"test_first_name",
        last_name:"test_last_name",
        username:"test_username"
    },
    num_of_comments: 6
}

const mockAllComments = {
    comments: [
        {
            content: "somecontent1",
            date_published: "01-01-2001",
            author: "testusername"
        },
        {
            content: "somecontent2",
            date_published: "03-12-2012",
            author: "testbobusername"
        }
    ],

}

// let generalStore; 
let postStore:any
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(SinglePostComments, {
        global: {
            plugins: [pinia],
            components: {
                SinglePostCommentsList,
                SinglePostCommentAdd
            },
            mocks: {},
            stubs: {
                SinglePostCommentsList: true,
                SinglePostCommentAdd: true
            },
        },
        props: {
            post: mockPost,
        },
        slots: {}
    })
};

describe('Testing the comments component that is inside of post id page', () => {

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        postStore = usePostStore(pinia); 
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

        postStore.allComments = mockAllComments

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
    test('Should have a "post" prop', () => {
        wrapper = factory()

        expect(wrapper.props("post")).toBeTruthy()
    })
    test('Should have the two comments components', () => {
        wrapper = factory()

        const commentList = wrapper.findComponent({ name: "SinglePostCommentsList" })
        expect(commentList.exists()).toBe(true)

        const commentAdd = wrapper.findComponent({ name: "SinglePostCommentAdd" })
        expect(commentAdd.exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()
    })
});