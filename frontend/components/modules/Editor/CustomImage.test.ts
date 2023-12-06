import { Image }from './CustomImage'

test('Customimage should match snapshot', () => {
    expect(Image).toMatchSnapshot()     
})