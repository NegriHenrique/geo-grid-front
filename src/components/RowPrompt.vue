<template>
  <div v-if="row" class="row-prompt">
    <h3>{{ row.descricao }}</h3>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { PropType } from "vue";
import type { IRowCondition } from "../domain/entities/grid-game/GridGameEntity";
defineProps({
  row: Object as PropType<IRowCondition>,
});
</script>

<style scoped>
.row-prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-gray-500);
  width: var(--cell-width);
  height: var(--cell-width);
  border-radius: 0.5rem;
}
</style>
