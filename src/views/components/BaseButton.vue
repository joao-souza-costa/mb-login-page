<template>
  <button type="submit" :class="['base-button', variant]">
    <slot> {{ text }} </slot>
  </button>
</template>

<script setup>
defineProps({
  text: String,
  variant: {
    type: String,
    default: 'dark' // dark | light
  }
})
</script>

<style lang="scss" scoped>
.base-button {
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
