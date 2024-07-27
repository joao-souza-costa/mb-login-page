<template>
  <form class="section-person" @submit.prevent="handleNext">
    <h2 class="section-person__title">Pessoa Física</h2>
    <div class="section-person__form">
      <base-input v-model="payload.name" id="name" label="Nome *" required />
      <base-input
        v-model="payload.identification"
        :pattern="PATTERN_CPF"
        id="cpf"
        label="CPF *"
        min="0"
        required
        example="999.999.999-99"
      />
      <base-input
        v-model="payload.date"
        :max="maxDate"
        :example
        id="date"
        label="Data de nascimento *"
        type="date"
        required
      />
      <base-input
        v-model="payload.phone"
        :pattern="PATTERN_PHONE"
        id="phone"
        label="Telefone *"
        type="tel"
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
import { parseToBrazilianFormat, parseToISO8601 } from '@/app/utils/date'

const props = defineProps({
  payload: Object
})

const maxDate = parseToISO8601(new Date())
const example = parseToBrazilianFormat(new Date())

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
