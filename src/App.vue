<template>
  <main class="board">
    <ColumnsPrompt :columns="columns_prompt" />
    <div
      class="row"
      v-for="(gameColumn, columnIndex) in game"
      :key="columnIndex"
    >
      <RowPrompt :row="rows_prompt[columnIndex]" />
      <GameCell
        v-for="(gameCell, cellIndex) in gameColumn"
        :key="`game-cell-${columnIndex}-${cellIndex}`"
        :gameCell="gameCell"
        :columnIndex="columnIndex"
        :cellIndex="cellIndex"
        @select="showInput"
      />
    </div>
    <InputContainer
      v-if="gameCellSelected"
      :countryOptions="gameCellSelected.countryOptions"
      @input="searchCountry"
      @select="asignCountry"
      @close="hideInput"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useGameState from "./presentation/bloc/gridGameState";
import ColumnsPrompt from "./components/ColumnsPrompt.vue";
import RowPrompt from "./components/RowPrompt.vue";
import GameCell from "./components/GameCell.vue";
import InputContainer from "./components/InputContainer.vue";
import type {
  IColumnCondition,
  IGridGameRow,
  IRowCondition,
} from "./domain/entities/grid-game/GridGameEntity";
import type { ICountry } from "./domain/entities/country/CountryEntity";

const rows_prompt = ref<IRowCondition[]>([]);
const columns_prompt = ref<IColumnCondition[]>([]);
const game = ref<IGridGameRow[]>([]);
const countries_list = ref<ICountry[]>([]);
const gameCellSelected = ref<{
  columnIndex: number;
  cellIndex: number;
  countryOptions: ICountry[];
} | null>(null);

const store = useGameState();

async function init() {
  await store.initGame();
  const { board, row_conditions, column_conditions } = store.getGameSet;
  const countries = store.getCountries;

  rows_prompt.value = row_conditions;
  columns_prompt.value = column_conditions;
  game.value = board;
  countries_list.value = countries;
}

function showInput(columnIndex: number, cellIndex: number) {
  gameCellSelected.value = {
    columnIndex,
    cellIndex,
    countryOptions: countries_list.value,
  };
}

function hideInput() {
  gameCellSelected.value = null;
}

function searchCountry(inputValue: string): void {
  const filteredCountries = countries_list.value.filter((country) =>
    country.name.toLowerCase().includes(inputValue)
  );
  if (gameCellSelected.value) {
    gameCellSelected.value.countryOptions = filteredCountries;
  }
}

function asignCountry(countryId: number) {
  if (!gameCellSelected.value) return;
  const { columnIndex, cellIndex } = gameCellSelected.value;
  const cell = game.value[columnIndex][cellIndex];

  if (!cell || cell.is_answered) return;

  const countryIndex = cell.possible_answers.findIndex(
    (country) => country.id === countryId
  );

  if (countryIndex !== -1) {
    cell.is_answered = true;
    cell.country_asigned_index = countryIndex;
    game.value[columnIndex].splice(cellIndex, 1, cell);
  }

  hideInput();
}

init();
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: "Roboto", sans-serif;
}

.row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  height: var(--cell-width);
}
</style>
