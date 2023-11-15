import { mount } from '@vue/test-utils'
import Following from './Following.vue'

describe('following testing', () => {
    const wrapper = mount(Following, {
        props: {
            username:"testusername" 
        }
    })
    
    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
    // test('username is rendered', () => {
    //     expect(wrapper.html()).toContain("testusername")
    // })
    //^doesnt work because of nuxt-link
})