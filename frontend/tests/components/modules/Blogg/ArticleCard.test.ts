import ArticleCard from '~/components/modules/Blogg/ArticleCard.vue'
import { mount } from '@vue/test-utils'

suite("testing PostArticle", async () => {

    const wrapper = mount(ArticleCard, {
        slots: {
            title:'<h2 class="prose">Just testing</h2>',
            content:'<p class="prose">Body content goes here</p>',
            author:'<small id="test">mr test</small>',
            date_published:'<img src="x" alt="2023-23-2">',
            lesmer:'<p>lesmer</p>',
            article_image:'<img src="~/source/to/image.jpg" alt="test">',
            "amount-of-comments": '<span>37</span>'
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
    it("should render the 'author' name", () => {
        assert(wrapper.html().includes('<small id="test">mr test</small>'), 'author information is not getting rendered')
    } )
    it('should render information about the "date published"', () => {
        assert(wrapper.html().includes('<img src="x" alt="2023-23-2">'), "date for publish is not rendering")
        })
    it('should render "les mer" through slot', () => {
        assert(wrapper.html().includes('<p>lesmer</p>'), '"lesmer" is not rendered')
    })
    it('article image should be rendered', () => {
        assert(wrapper.html().includes('<img src="~/source/to/image.jpg" alt="test">'), 'image is not rendering through slot')
    })
    it("Should render the number of comments a post has", () => {
        assert(wrapper.html().includes('<span>37</span>'), "the number of comments are not displayed")
        expect(wrapper.html()).not.toContain('Number of comments.')
    })
})
