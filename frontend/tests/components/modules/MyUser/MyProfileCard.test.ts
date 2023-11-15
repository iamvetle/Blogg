import LoggedInUserProfileCard from '~/components/modules/MyProfile/LoggedInUserProfileCard.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';

describe('testing LoggedInUserProfileCard.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoggedInUserProfileCard, {
      global: {
        mocks: {},
        stubs: {},
      },
      slots: {
        username:"testusername",
        "full-name":"test_fulltnavn",
        "amount-of-followers":"243",
      },
      props: {
        profilePictureProp: "~/src/something.jpg"
      }
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  test("props are being passed correctly", () => {
    const ell = wrapper.get("[data-test='imgprop']")

    expect(ell.attributes("src")).toBe("~/src/something.jpg")

    expect(wrapper.text()).toMatchSnapshot()

  })
});