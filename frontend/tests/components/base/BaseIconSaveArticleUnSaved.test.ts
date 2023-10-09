import { VueWrapper, mount } from '@vue/test-utils'
import BaseIconSaveArticleUnSaved from '~/components/base/BaseIconSaveArticleUnSaved.vue'

describe('_blank testing', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(BaseIconSaveArticleUnSaved, {
            props: {
                colorProp: "fillred",
                heightProp:"32",
                widthProp:"13",
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
        expect(wrapper.props().colorProp).toBe("fillred")
    })

    test("the icon is rendered in the prop color", () => {
        const svg = wrapper.find("svg")

        expect(svg.attributes("class")).toContain("fillred")
    })

    test("has width and height props", () => {
        expect(wrapper.props().heightProp).toBe("32")
        expect(wrapper.props().widthProp).toBe("13")
    })

    test("the icons size is based on the width and height values", () => {
        const svg = wrapper.find("svg")

        expect(svg.attributes("height")).toContain(wrapper.props().heightProp)
        expect(svg.attributes("width")).toContain(wrapper.props().widthProp)

    })
})