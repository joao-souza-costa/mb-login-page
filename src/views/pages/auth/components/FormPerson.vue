<template>
  <base-form title="Pessoa Física" current-step="2" steps="4" @submit="handleNext">
    <div class="form-person">
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

    <template #button>
      <base-button text="voltar" variant="light" @click.prevent="handleBack" />
      <base-button text="continuar" />
    </template>
  </base-form>
</template>

<script setup>
import { reactive } from 'vue'
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import BaseForm from '@/views/components/BaseForm.vue'
import BaseButton from '@/views/components/BaseButton.vue'
import { AUTH_SECTIONS, PATTERN_PHONE } from '@/app/constants/auth'
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
.form-person {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.25rem 0;
}
</style>
