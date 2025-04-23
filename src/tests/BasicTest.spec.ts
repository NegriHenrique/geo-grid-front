import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

const TestComponent = defineComponent({
  template: "<div>Hello, World!</div>",
});

describe("Basic Test", () => {
  it("renders correctly", () => {
    const wrapper = mount(TestComponent);
    expect(wrapper.text()).toBe("Hello, World!");
  });
});
