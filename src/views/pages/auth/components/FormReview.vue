<template>
  <form class="section-review" @submit.prevent="handleSubmit">
    <slot>
      <h2 class="section-review__title">Revise suas informações</h2>
    </slot>
    <div class="section-review__form">
      <base-input
        v-model="payload.email"
        :pattern="PATTERN_EMAIL"
        type="email"
        id="email"
        label="Endereço de email *"
        example="joao.souza@mail.com"
        required
      />

      <base-input
        v-model="payload.identification"
        :label="identificationLabel"
        :pattern="identificationPattern"
        :example="identificationExample"
        id="identification"
        type="text"
        min="0"
        required
      />

      <base-input
        v-model="payload.date"
        :max="maxDate"
        :example
        :label="dateLabel"
        id="date"
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

      <base-input
        v-model="payload.password"
        id="password"
        type="password"
        label="Sua senha"
        :pattern="PATTERN_PASSWORD"
        required
      />
    </div>

    <div class="section-password__buttons">
      <base-button :disabled="loading" text="voltar" variant="light" @click.prevent="handleBack" />
      <base-button :loading text="continuar" />
    </div>
  </form>
</template>

<script setup>
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
import BaseButton from '@/views/components/BaseButton.vue'
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import { computed, reactive } from 'vue'

const maxDate = parseToISO8601(new Date())
const example = parseToBrazilianFormat(new Date())

const props = defineProps({
  payload: Object,
  loading: Boolean
})

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

const identificationLabel = computed(() => (isCPF.value ? 'CPF *' : 'CNPJ *'))
const identificationPattern = computed(() => (isCPF.value ? PATTERN_CPF : PATTERN_CNPJ))

const identificationExample = computed(() =>
  isCPF.value ? '999.999.999-99' : '99.999.999/9999-999'
)

const dateLabel = computed(() => (isCPF.value ? 'Data de nascimento *' : 'Data de abertura *'))

const emit = defineEmits(['back', 'submitPayload'])

function handleBack() {
  emit('back', AUTH_SECTIONS.PASSWORD)
}

function handleSubmit() {
  emit('submitPayload', { payload })
}
</script>

<style lang="scss" scoped>
.section-review {
  &__title {
    margin-bottom: 1.25rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: 1.25rem 0;
  }
}
</style>
