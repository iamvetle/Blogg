import { VueWrapper, mount } from '@vue/test-utils'
import BaseIconSaveArticleUnSaved from '~/components/base/BaseIconSaveArticleUnSaved.vue'

describe('_blank testing', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(BaseIconSaveArticleUnSaved, {
            props: {
                fillColor: "red",
                height:"32",
                width:"13",
            }
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("there is a svg", () => {
        const element = wrapper.find("svg")

        expect(element.exists()).toBe(true)
    })

    // Checks to see if the component has the prop called 'colorProp'
    // and if it will be set to the value of 'red'
    // (I can mention the 'colorProp' prop here because I specified 
    // that it would be in the component above)
    test("component has color prop", () => {
        expect(wrapper.props().fillColor).toBe("red")
    })

    test("the icon is rendered in the prop color", () => {
        const svg = wrapper.find("svg")

        expect(svg.attributes("fill")).toContain("red")
    })

    test("has width and height props", () => {
        expect(wrapper.props().height).toBe("32")
        expect(wrapper.props().width).toBe("13")
    })

    test("the icons size is based on the width and height values", () => {
        const svg = wrapper.find("svg")

        expect(svg.attributes("height")).toContain(wrapper.props().height)
        expect(svg.attributes("width")).toContain(wrapper.props().width)

    })
})