import RowPrompt from "../components/RowPrompt.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

describe("RowPrompt.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(RowPrompt, {
      props: {
        row: {
          descricao: "Test Row",
          scope: "testScope",
          arg: 123,
          possible_answers_count: 1,
        },
      },
    });
    expect(wrapper.text()).toContain("Test Row");
  });

  it("renders correctly without props", () => {
    const wrapper = mount(RowPrompt);
    expect(wrapper.text()).toBe("");
  });
});
