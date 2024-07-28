<template>
  <div class="section-success">
    <checkIcon class="section-success__icon" />
    <p>Cadastro concluido com sucesso!</p>
    <base-button text="Voltar ao inicio" @click="handleClick" />
  </div>
</template>

<script setup>
import { AUTH_SECTIONS } from '@/app/constants/auth'
import checkIcon from '@/views/assets/checkIcon.vue'
import BaseButton from '@/views/components/BaseButton.vue'

const emit = defineEmits(['back'])

function handleClick() {
  emit('back', AUTH_SECTIONS.EMAIL)
}
</script>

<style lang="scss" scoped>
.section-success {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__icon {
    width: 5rem;
    color: white;
    border-radius: 10px;
    padding: 1rem;
    background-color: green;
  }
}
</style>
