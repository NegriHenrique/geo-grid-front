<template>
  <div class="game-cell">
    <template v-if="gameCell?.is_answered">
      <div class="flag-container">
        <img
          :src="
            gameCell.possible_answers[gameCell?.country_asigned_index ?? 0].flag
          "
          :alt="`Flag of ${
            gameCell.possible_answers[gameCell?.country_asigned_index ?? 0].name
          }`"
        />
      </div>
      <p class="country-name">
        {{
          gameCell?.possible_answers?.[gameCell?.country_asigned_index ?? 0]
            ?.name
        }}
      </p>
    </template>
    <template v-else>
      <button @click="$emit('select', columnIndex, cellIndex)"></button>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { IGridGameCell } from "../domain/entities/grid-game/GridGameEntity";

defineProps({
  gameCell: Object as PropType<IGridGameCell>,
  columnIndex: Number,
  cellIndex: Number,
});

defineEmits(["select"]);
</script>

<style scoped>
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

.flag-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.country-name {
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  background-color: var(--color-gray-700);
  border-radius: 0.25rem;
  padding: 0.2rem 0;
  margin-top: auto;
}
</style>
