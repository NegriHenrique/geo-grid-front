<template>
  <!-- <div class="main top-1/2 left-1/2">
    <div></div>
    <div class="column flex gap-4">
      <div
        v-for="column in columns"
        :index="index"
        class="bg-gray-800 w-full h-full text-white p-4 text-2xl text-center flex items-center justify-center"
      >
        {{ column.descricao }}
      </div>
    </div>
    <div class="row flex flex-col gap-4">
      <div
        v-for="row in rows"
        :index="index"
        class="bg-gray-800 w-full h-full text-white p-4 text-2xl text-center flex items-center justify-center"
      >
        {{ row.descricao }}
      </div>
    </div>
    <template v-for="(row, rowIndex) in game" :key="rowIndex">
      <div
        v-for="(column, columnIndex) in row"
        :key="columnIndex"
        class="game-cell"
      >
        <div class="flag-container">
          <img
            :src="game[rowIndex][columnIndex].possible_answers[0].flag"
            alt=""
            srcset=""
            class="mx-auto w-full"
          />
        </div>
        <p class="text-white">
          {{ game[rowIndex][columnIndex].possible_answers[0].name }}
        </p>
      </div>
    </template>
  </div> -->

  <main class="board flex flex-col gap-4 bg-color-red">
    <div class="row columns-prompt">
      <div class="filler"></div>
      <hgroup
        v-for="(column, columnIndex) in columns_prompt"
        :key="columnIndex"
        class="flex items-center justify-center column-prompt"
      >
        <h3>{{ column.descricao }}</h3>
      </hgroup>
    </div>
    <div class="row" v-for="(gameColumn, gameColumnIndex) in game">
      <div class="flex items-center justify-center row-prompt">
        <h3>{{ rows_prompt[gameColumnIndex].descricao }}</h3>
      </div>
      <div
        class="game-cell"
        v-for="(gameCell, gameCellIndex) in gameColumn"
        :key="`game-cell-${gameColumnIndex}-${gameCellIndex}`"
      >
        <template
          v-if="
            gameCell?.is_answered &&
            gameCell?.country_asigned_index !== undefined
          "
        >
          <div class="flag-container">
            <img
              :src="
                gameCell.possible_answers[gameCell.country_asigned_index].flag
              "
              :alt="`Imagem de bandeira do país: ${
                gameCell.possible_answers[gameCell.country_asigned_index].name
              }`"
              class="mx-auto w-full"
            />
          </div>
          <p class="country-name">
            {{ gameCell.possible_answers[gameCell.country_asigned_index].name }}
          </p>
        </template>
        <template v-else>
          <button
            :ref="`buttonGameCell${gameColumnIndex}${gameCellIndex}`"
            :class="'country-button-option' + (wrongAttempt ? ' error' : '')"
            :id="`game-cell-${gameColumnIndex}-${gameCellIndex}-button`"
            @click="showInput(gameColumnIndex, gameCellIndex)"
          ></button>
        </template>
      </div>
    </div>
  </main>
  <template v-if="gameCellSelected">
    <div class="input-container">
      <input
        class="input"
        ref="inputCountry"
        autofocus
        placeholder="Digite o nome do país"
        type="text"
        auto-complete="true"
        @input="(event) => searchCountry(event.target.value)"
      />
      <ul v-if="gameCellSelected.countryOptions" class="country-list">
        <li
          v-for="country in gameCellSelected.countryOptions"
          @click="asignCountry(country.id)"
          class="country-option"
        >
          {{ country.name }}
        </li>
      </ul>
    </div>
    <div class="overlay" @click="hideInput()"></div>
  </template>
</template>

<script setup>
import useGameState from "./presentation/bloc/gridGameState";
import { ref, onMounted, nextTick } from "vue";

const rows_prompt = ref([]);
const columns_prompt = ref([]);
const game = ref([]);
const countries_list = ref([]);
const buttonClicked = ref(null);
const inputCountry = ref(null);

const wrongAttempt = ref(false);

const gameCellSelected = ref(null);

async function init() {
  const store = useGameState();

  await store.initGame();

  const { board, row_conditions, column_conditions } = store.getGameSet;
  const countries = store.getCountries;

  // Atribuindo os novos valores
  rows_prompt.value = row_conditions;
  columns_prompt.value = column_conditions;
  game.value = board;
  countries_list.value = countries;
}

function showInput(columnIndex, gameCellIndex) {
  const possibleAnswers =
    game.value[columnIndex][gameCellIndex]?.possible_answers;

  gameCellSelected.value = {
    columnIndex,
    gameCellIndex,
    possibleAnswers,
  };

  nextTick(() => {
    inputCountry.value.focus();
  });
}

function hideInput() {
  gameCellSelected.value = null;
}

function searchCountry(inputValue) {
  const filteredCountries = countries_list.value.filter((country) =>
    country.name.toLowerCase().includes(inputValue)
  );

  gameCellSelected.value.countryOptions = filteredCountries;
}

function asignCountry(countryId) {
  const colIndex = gameCellSelected.value.columnIndex;
  const cellIndex = gameCellSelected.value.gameCellIndex;
  const cell = game.value[colIndex][cellIndex];

  gameCellSelected.value = null;

  if (!cell || cell.is_answered) {
    wrongAttempt.value = true;
    setTimeout(() => {
      wrongAttempt.value = false;
    }, 2000);
    return;
  }

  const countryIndex = cell.possible_answers.findIndex(
    (country) => country.id === countryId
  );
  if (countryIndex === -1) {
    wrongAttempt.value = true;
    setTimeout(() => {
      wrongAttempt.value = false;
    }, 2000);
    return;
  }

  const newCell = {
    ...cell,
    is_answered: true,
    country_asigned_index: countryIndex,
  };

  game.value[colIndex].splice(cellIndex, 1, newCell);
}

init();
</script>

<style scoped>
@layer components {
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

  .row-prompt {
    display: flex;
    gap: 1rem;
    height: 100%;
    width: var(--cell-width);
    background-color: var(--color-gray-500);
    border-radius: 0.5rem;
  }

  .columns-prompt {
    display: flex;
    gap: 1rem;
    width: 100%;
    border-radius: 0.5rem;
  }

  .filler {
    width: var(--cell-width);
    height: var(--cell-width);
  }
  .column-prompt {
    display: flex;
    height: 100%;
    width: var(--cell-width);
    height: var(--cell-width);
    border-radius: 0.5rem;
    background-color: var(--color-gray-500);
  }

  .game-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-gray-800);
    width: var(--cell-width);
    height: var(--cell-width);
    border-radius: 0.5rem;
  }

  .game-cell .flag-container {
    padding: 1rem;
    margin: auto;
  }

  .game-cell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    font-family: "Roboto", sans-serif;
  }

  p.country-name {
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
    font-family: "Roboto", sans-serif;
    width: 80%;
    background-color: var(--color-gray-700);
    border-radius: 0.25rem;
    padding: 0.2rem 0;
    margin: 0;
    margin-top: auto;
    margin-bottom: 0.5rem;
  }

  button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 0.5rem;
  }

  button.error {
    background-color: var(--color-red-400);
    animation: errorAnimation 2s ease 0s 1 normal forwards;
  }

  button:hover {
    background-color: var(--color-gray-500);
  }

  .input-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    z-index: 11;
    display: flex;
  }

  .input-container input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: #333;
    background-color: white;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
  }

  .country-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border-radius: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
    z-index: 12;
    padding: 1rem 0;
  }

  .country-option {
    list-style: none;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0 1rem;
  }

  .country-option:hover {
    background-color: #ebebeb;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  @keyframes errorAnimation {
    0%,
    100% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }

    10% {
      transform: rotate(8deg);
    }

    20%,
    40%,
    60% {
      transform: rotate(-10deg);
    }

    30%,
    50%,
    70% {
      transform: rotate(10deg);
    }

    80% {
      transform: rotate(-8deg);
    }

    90% {
      transform: rotate(8deg);
    }
  }
}
</style>
