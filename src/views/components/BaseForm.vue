<template>
  <form class="base-form" @submit.prevent="$emit('submit')">
    <small>
      Etapa <span class="base-form__step">{{ currentStep }}</span> de {{ steps }}
    </small>
    <h2 class="base-form__title">{{ title }}</h2>

    <slot />

    <div class="base-form__buttons">
      <slot name="button" />
    </div>
  </form>
</template>

<script setup>
defineEmits(['submit'])

defineProps({
  title: String,
  steps: String,
  currentStep: String
})
</script>

<style lang="scss" scoped>
.base-form {
  &__title {
    margin-bottom: 1.25rem;
  }

  &__step {
    color: var(--color-primary);
  }

  &__buttons {
    margin-top: 1.25rem;
    display: flex;
    flex-direction: row;
    flex: 1;
    gap: 1rem;
  }
}
</style>
