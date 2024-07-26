<template>
  <form class="section-company" @submit.prevent="handleNext">
    <h2 class="section-company__title">Pessoa Juridica</h2>
    <div class="section-company__form">
      <base-input v-model="payload.name" id="company-name" label="Razão social *" required />
      <base-input
        v-model="payload.identification"
        id="cnpj"
        label="CNPJ *"
        type="text"
        min="0"
        :pattern="PATTERN_CNPJ"
        required
        example="99.999.999/9999-99"
      />
      <base-input
        v-model="payload.date"
        :max="yourDate"
        :example="yourDate.split('-').reverse().join('/')"
        id="foudDate"
        label="Data de abertura *"
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

    <div class="section-company__buttons">
      <base-button text="voltar" variant="light" @click.prevent="handleBack" />
      <base-button text="continuar" />
    </div>
  </form>
</template>

<script setup>
import { AUTH_SECTIONS, PATTERN_CNPJ, PATTERN_PHONE } from '@/app/constants/auth'
import BaseButton from '@/views/components/BaseButton.vue'
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import { reactive } from 'vue'

const emit = defineEmits(['back', 'next'])

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

function handleBack() {
  emit('back', AUTH_SECTIONS.EMAIL)
}

function handleNext() {
  emit('next', { nextSection: AUTH_SECTIONS.PASSWORD, payload })
}
</script>

<style lang="scss" scoped>
.section-company {
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
