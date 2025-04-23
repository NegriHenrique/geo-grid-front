import { mount } from "@vue/test-utils";
import GameCell from "../components/GameCell.vue";

describe("GameCell.vue", () => {
  it("renders answered cell with flag and name", () => {
    const gameCell = {
      is_answered: true,
      possible_answers: [{ flag: "brazil.png", name: "Brazil" }],
      country_asigned_index: 0,
      row_condition: null,
      column_condition: null,
    };

    const wrapper = mount(GameCell, {
      props: { gameCell, columnIndex: 0, cellIndex: 0 },
    });

    const img = wrapper.find("img");
    const name = wrapper.find(".country-name");

    expect(img.attributes("src")).toBe("brazil.png");
    expect(name.text()).toBe("Brazil");
  });

  it("renders button for unanswered cell and emits select event", async () => {
    const gameCell = { is_answered: false, possible_answers: [] };

    const wrapper = mount(GameCell, {
      props: { gameCell, columnIndex: 0, cellIndex: 0 },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.emitted().select).toBeTruthy();
    expect(wrapper.emitted().select[0]).toEqual([0, 0]);
  });
});
