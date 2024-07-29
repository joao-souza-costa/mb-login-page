<template>
  <base-form
    title="Revise suas informações"
    steps="4"
    current-step="4"
    class="section-review"
    @submit="handleSubmit"
  >
    <div class="form-review">
      <base-input
        :ref="(el) => refMap.set('email', el)"
        v-model="payload.email"
        :pattern="PATTERN_EMAIL"
        type="email"
        id="email"
        label="Endereço de email *"
        example="email@mail.com"
        required
      />

      <base-input
        :ref="(el) => refMap.set('name', el)"
        v-model="payload.name"
        id="name"
        label="Nome *"
        required
      />

      <base-input
        :ref="(el) => refMap.set('identification', el)"
        v-model="payload.identification"
        :label="identification.label"
        :pattern="identification.pattern"
        :example="identification.example"
        id="identification"
        type="text"
        min="0"
        required
      />

      <base-input
        :ref="(el) => refMap.set('date', el)"
        v-model="payload.date"
        :max="maxDate"
        :example
        :label="identification.dateLabel"
        id="date"
        type="date"
        required
      />

      <base-input
        :ref="(el) => refMap.set('tel', el)"
        v-model="payload.phone"
        :pattern="PATTERN_PHONE"
        id="phone"
        label="Telefone *"
        type="tel"
        example="0800619619"
        required
      />

      <base-input
        :ref="(el) => refMap.set('password', el)"
        v-model="payload.password"
        id="password"
        type="password"
        label="Sua senha"
        :pattern="PATTERN_PASSWORD"
        required
      />
    </div>

    <template #button>
      <base-button :disabled="loading" text="voltar" variant="light" @click.prevent="handleBack" />
      <base-button :loading text="continuar" />
    </template>
  </base-form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import BaseButton from '@/views/components/BaseButton.vue'
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import BaseForm from '@/views/components/BaseForm.vue'

import {
  AUTH_SECTIONS,
  IDENTiFICATION_TYPE,
  PATTERN_CNPJ,
  PATTERN_CPF,
  PATTERN_EMAIL,
  PATTERN_PHONE,
  PATTERN_PASSWORD
} from '@/app/constants/auth'
import { parseToBrazilianFormat, parseToISO8601 } from '@/app/utils/date'
import authService from '@/app/services/authService'
import { GENERAL_INPUT_MESSAGES } from '@/app/constants/messages'

const refMap = new Map()

const maxDate = parseToISO8601(new Date())
const example = parseToBrazilianFormat(new Date())

const props = defineProps({
  payload: Object
})

const loading = ref(null)

const payload = reactive({
  email: props.payload.email,
  name: props.payload.name,
  identification: props.payload.identification,
  date: props.payload.date,
  phone: props.payload.phone,
  password: props.payload.password
})

const isCPF = computed(() => {
  return props.payload.type === IDENTiFICATION_TYPE.CPF
})

const identification = computed(() => ({
  label: isCPF.value ? 'CPF *' : 'CNPJ *',
  pattern: isCPF.value ? PATTERN_CPF : PATTERN_CNPJ,
  example: isCPF.value ? '999.999.999-99' : '99.999.999/9999-999',
  dateLabel: isCPF.value ? 'Data de nascimento *' : 'Data de abertura *'
}))

const emit = defineEmits(['back', 'submitPayload'])

function handleBack() {
  emit('back', AUTH_SECTIONS.PASSWORD)
}

function handleSubmit() {
  loading.value = true
  return authService
    .createUser(Object.assign(props.payload, payload))
    .then(() => {
      emit('next', { payload: null, nextSection: AUTH_SECTIONS.SUCCESS })
    })
    .catch((e) => {
      const { field, error } = e.body
      refMap.get(field).setCustomValidity(GENERAL_INPUT_MESSAGES[error])
    })
    .finally(() => (loading.value = false))
}
</script>

<style lang="scss" scoped>
.form-review {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.25rem 0;
}
</style>
