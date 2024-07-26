<template>
  <form class="section-review">
    <slot>
      <h2 class="section-review__title">Revise suas informações</h2>
    </slot>
    <div class="section-review__form">
      <base-input
        v-model="payload.email"
        type="email"
        id="email"
        :pattern="PATTERN_EMAIL"
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
        :max="yourDate"
        :example="yourDate.split('-').reverse().join('/')"
        id="date"
        :label="dateLabel"
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

      <base-input
        v-model="payload.password"
        id="password"
        type="password"
        label="Sua senha"
        minlength="8"
        required
      />
    </div>

    <div class="section-password__buttons">
      <base-button text="voltar" variant="light" @click.prevent="handleBack" />
      <base-button text="continuar" />
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
  PATTERN_PHONE
} from '@/app/constants/auth'
import BaseButton from '@/views/components/BaseButton.vue'
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import { computed, reactive } from 'vue'

const yourDate = new Date().toISOString().split('T')[0] //TODO: FAZER UM ENUM E UM UTIL

const props = defineProps({
  payload: Object
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

const emit = defineEmits(['back'])

function handleBack() {
  emit('back', AUTH_SECTIONS.PASSWORD)
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
