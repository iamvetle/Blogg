import ArticleCardd from '~/components/modules/Blogg/ArticleCardd.vue'
import { mount } from '@vue/test-utils'

suite("testing PostArticle", async () => {


    const wrapper = mount(ArticleCardd, {
        slots: {
            title:'<h2 class="prose">Just testing</h2>',
            content:'<p class="prose">Body content goes here</p>',
            author:'<small id="test">mr test</small>',
            date_published:"<ul><li>2023-23-2</li></ul>"
        }
    }) 
    
    test("exists", () => {
        console.log(wrapper.html())
        expect(wrapper.exists()).toBe(true)
    })
    it("'title' slot should render", () => {
        assert(wrapper.html().includes('<h2 class="prose">Just testing</h2>'), "'title' slot does not render")
    })
    it("'the 'content' gets rendered", () => {
        assert(wrapper.html().includes('<p class="prose">Body content goes here</p>'), "the content does not get rendered")
    } )
    it("should render the author name", () => {
        assert(wrapper.html().includes('<small id="test">mr test</small>'), 'author information is not getting rendered')
    } )
    it('should render information about the date published', () => {
        assert(wrapper.html().includes("<ul><li>2023-23-2</li></ul>"), "date publish is not rendering")
        })
})
