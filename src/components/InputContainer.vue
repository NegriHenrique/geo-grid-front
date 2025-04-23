<template>
  <div class="input-container">
    <input
      class="input"
      ref="inputCountry"
      autofocus
      placeholder="Digite o nome do país"
      type="text"
      @input="onInput"
    />
    <ul v-if="countryOptions?.length" class="country-list">
      <li
        v-for="country in countryOptions"
        :key="country.id"
        @click="selectCountry(country.id)"
        class="country-option"
      >
        {{ country.name }}
      </li>
    </ul>
    <div class="overlay" @click="$emit('close')"></div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps, defineEmits } from "vue";
import type { ICountry } from "../domain/entities/country/CountryEntity";

defineProps({
  countryOptions: {
    type: Array as PropType<ICountry[]>,
    required: true,
  },
});

const emit = defineEmits(["input", "select", "close"]);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("input", target.value);
};

const selectCountry = (countryId: string | number) => {
  emit("select", countryId);
};
</script>

<style scoped>
.input-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  z-index: 11;
  display: flex;
  flex-direction: column;
}

.input-container input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #333;
  background-color: white;
  font-size: 1rem;
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
</style>
