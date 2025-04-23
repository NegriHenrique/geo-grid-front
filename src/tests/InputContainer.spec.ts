import { mount } from "@vue/test-utils";
import InputContainer from "../components/InputContainer.vue";

describe("InputContainer.vue", () => {
  it("renders input and emits input event", async () => {
    const wrapper = mount(InputContainer, {
      props: { countryOptions: [] },
    });

    const input = wrapper.find("input");
    await input.setValue("Brazil");

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual(["Brazil"]);
  });

  it("renders country options and emits select event", async () => {
    const countries = [
      { id: 1, name: "Brazil" },
      { id: 2, name: "Argentina" },
    ];
    const wrapper = mount(InputContainer, {
      props: { countryOptions: countries },
    });

    const options = wrapper.findAll(".country-option");
    expect(options.length).toBe(2);

    await options[0].trigger("click");
    expect(wrapper.emitted().select).toBeTruthy();
    expect(wrapper.emitted().select[0]).toEqual([1]);
  });

  it("emits close event when overlay is clicked", async () => {
    const countries = [
      { id: 1, name: "Brazil" },
      { id: 2, name: "Argentina" },
    ];

    const wrapper = mount(InputContainer, {
      props: { countryOptions: countries },
    });
    const overlay = wrapper.find(".overlay");

    await overlay.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
