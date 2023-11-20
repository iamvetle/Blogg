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
    num_of_comments: 6
}

// let generalStore; 
// let postStore; 
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
            post: mockPost
        },
        slots: {}
    })
};

describe('Testing the comments component that is inside of post id page', () => {

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
    test('Should have a "comments" prop', () => {
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