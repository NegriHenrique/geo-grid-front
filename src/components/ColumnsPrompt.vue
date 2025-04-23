<template>
  <div class="columns-prompt">
    <div class="filler"></div>
    <hgroup
      v-for="(column, index) in columns"
      :key="index"
      class="column-prompt"
    >
      <h3>{{ column.descricao }}</h3>
    </hgroup>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from "vue";
import type { IColumnCondition } from "../domain/entities/grid-game/GridGameEntity";
defineProps({
  columns: Array as PropType<IColumnCondition[]>,
});
</script>

<style scoped>
.columns-prompt {
  display: flex;
  gap: 1rem;
  width: 100%;
  border-radius: 0.5rem;
}

.column-prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-gray-500);
  width: var(--cell-width);
  height: var(--cell-width);
  border-radius: 0.5rem;
}
</style>
