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
        v-for="(gameRow, gameRowIndex) in gameColumn"
        :key="gameRowIndex"
      >
        <div class="flag-container">
          <img
            :src="gameRow.possible_answers[0].flag"
            :alt="`Imagem de bandeira do país: ${gameRow.possible_answers[0].name}`"
            class="mx-auto w-full"
          />
        </div>
        <p class="country-name">
          {{ gameRow.possible_answers[0].name }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import useGameState from "./presentation/bloc/gridGameState";
import { onMounted, reactive, watchEffect } from "vue";
const store = useGameState();

let rows_prompt = reactive([]),
  columns_prompt = reactive([]),
  game = reactive([]);

watchEffect((val) => {
  const { board, row_conditions, column_conditions } = store.getGameSet;

  rows_prompt = row_conditions;
  columns_prompt = column_conditions;
  game = board;

  console.log(store.getGameSet);
});

onMounted(async () => {
  const map = await store.initGame();
});
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
    border-radius: 0.2rem;
    padding: 0.2rem 0;
    margin: 0;
    margin-top: auto;
    margin-bottom: 0.5rem;
  }
}
</style>
