<template>
  <form class="section-person" @submit.prevent="handleNext">
    <h2 class="section-person__title">Pessoa Física</h2>
    <div class="section-person__form">
      <base-input v-model="payload.name" id="name" label="Nome *" required />
      <base-input
        v-model="payload.identification"
        id="cpf"
        label="CPF *"
        :pattern="PATTERN_CPF"
        min="0"
        required
        example="999.999.999-99"
      />
      <base-input
        v-model="payload.date"
        :max="yourDate"
        :example="yourDate.split('-').reverse().join('/')"
        id="date"
        label="Data de nascimento *"
        type="date"
        required
      />
      <base-input
        v-model="payload.phone"
        id="phone"
        label="Telefone *"
        type="tel"
        :pattern="PATTERN_PHONE"
        example="0800619619"
        required
      />
    </div>

    <div class="section-person__buttons">
      <base-button text="voltar" variant="light" @click.prevent="handleBack" />
      <base-button text="continuar" />
    </div>
  </form>
</template>

<script setup>
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import { reactive } from 'vue'
import { AUTH_SECTIONS, PATTERN_PHONE } from '@/app/constants/auth'
import BaseButton from '@/views/components/BaseButton.vue'
import { PATTERN_CPF } from '@/app/constants/auth'

const props = defineProps({
  payload: Object
})

const yourDate = new Date().toISOString().split('T')[0] //TODO: FAZER UM ENUM E UM UTIL

const payload = reactive({
  name: props.payload.name,
  identification: props.payload.identification,
  date: props.payload.date,
  phone: props.payload.phone
})

const emit = defineEmits(['back', 'next'])

function handleBack() {
  emit('back', AUTH_SECTIONS.EMAIL)
}

function handleNext() {
  emit('next', { nextSection: AUTH_SECTIONS.PASSWORD, payload })
}
</script>

<style lang="scss" scoped>
.section-person {
  &__title {
    margin-bottom: 1.25rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: 1.25rem 0;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    flex: 1;
    gap: 1rem;
  }
}
</style>
