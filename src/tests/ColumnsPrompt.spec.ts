import { mount } from "@vue/test-utils";
import ColumnsPrompt from "../components/ColumnsPrompt.vue";

describe("ColumnsPrompt.vue", () => {
  it("renders columns with descriptions", () => {
    const columns = [
      {
        descricao: "Column 1",
        scope: "scope1",
        arg: "arg1",
        possible_answers_count: 1,
      },
      {
        descricao: "Column 2",
        scope: "scope2",
        arg: "arg2",
        possible_answers_count: 2,
      },
    ];

    const wrapper = mount(ColumnsPrompt, {
      props: { columns },
    });

    const columnElements = wrapper.findAll(".column-prompt");
    expect(columnElements.length).toBe(2);
    expect(columnElements[0].text()).toBe("Column 1");
    expect(columnElements[1].text()).toBe("Column 2");
  });
});
