<template>
  <button :disabled type="submit" :class="['base-button', variant]">
    <slot v-if="!loading"> {{ text }} </slot>
    <base-spinner v-else />
  </button>
</template>

<script setup>
import BaseSpinner from './BaseSpinner.vue'
defineProps({
  text: String,
  loading: Boolean,
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'dark' // dark | light
  }
})
</script>

<style lang="scss" scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 500ms;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid var(--color-primary);
  cursor: pointer;
  border-radius: 0.5rem;

  &.light {
    color: var(--color-primary);
    background: white;

    &:hover {
      background: var(--color-primary);
      color: white;
    }
  }

  &.dark {
    background: var(--color-primary);
    color: white;
  }
}
</style>
