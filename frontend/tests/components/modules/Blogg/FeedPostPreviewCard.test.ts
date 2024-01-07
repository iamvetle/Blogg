import FeedPostPreviewCard from '~/components/modules/Blogg/FeedPostPreviewCard.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { testSnippetPostSingle } from '~/tests/testingHelpers/testConstants';
import { fromHTMLtoText } from '~/utils/fromHTMLtoText';

import { render, screen, within } from '@testing-library/vue'
import exampleImage from "~/assets/example-image.jpg";

let pinia = createTestingPinia();
let authStore: any;
let paginationStore: any;
// const feedPostsURL = "http://localhost:8888/api/posts/feed/"
// const feedPostsURLPreviousPage = `${feedPostsURL}?page=2`
// const feedPostsURLNextPage = `${feedPostsURL}?page=5`

let post = testSnippetPostSingle

let mockFromHTMLtoText = (value: any) => fromHTMLtoText(value);


describe("testing PostArticle", async () => {

    beforeEach(() => {
        // vi.stubGlobal("fromHTMLToText", () => {
        //     return null
        // })

        // vi.stubGlobal("fromHTMLToText", () => null);

        authStore = useAuthStore(pinia)
        paginationStore = usePaginationStore(pinia)

    })

    const wrapper = shallowMount(FeedPostPreviewCard, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {
                fromHTMLtoText: mockFromHTMLtoText
            },
            stubs: {},
        },
        props: {
            post: post
        },
    });

    test("Should exist", () => {
        console.log(wrapper.html())
        expect(wrapper.exists()).toBe(true)
    })
    test("The title should render", () => {
        expect(wrapper.text()).toContain(post.title)
    })
    test("The content(snippet) gets rendered", () => {
        const rawTextForTest = fromHTMLtoText(post.content_snippet)
        expect(wrapper.text()).toContain(rawTextForTest)

    })
    test("Should render the authors full name", async () => {
        // vi.stubGlobal("fromHTMLToText", () => null);
        render(FeedPostPreviewCard, {
            props: {
                post: post
            }, global: { mocks: { fromHTMLtoText: mockFromHTMLtoText } }
        })



        const authorPost = screen.getByTestId("post_author_name")
        within(authorPost).getByText(post.author.first_name, { exact: false })

    })
    test('should the "date published"', () => {
        const datePubText = wrapper.find("[data-test='post_date_published']")
        expect(datePubText.text()).toBe(post.date_published)

    })
    test('Should render "Les mer"', () => {
        expect(wrapper.html()).toContain("Les mer")
    })
    test('The image should have the correct temporary example image', () => {

        expect(wrapper.find("[data-test='post_article_image']").attributes("src")).toBe(exampleImage)
    })
    test("Should render the number of comments a post has", () => {

        expect(wrapper.html()).toContain(post.num_of_comments);
    })
    test('Should match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
