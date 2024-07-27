<template>
  <form class="section-email" @submit.prevent="submit">
    <slot>
      <h2 class="section-email__title">Seja bem vindo (a)</h2>
    </slot>
    <div class="section-email__form">
      <base-input
        v-model="payload.email"
        :pattern="PATTERN_EMAIL"
        type="email"
        id="email"
        label="Endereço de email *"
        example="joao.souza@mail.com"
        required
      />
      <base-radio-input v-model="payload.type" :options="options" id="type" />
    </div>
    <base-button text="continuar" />
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { AUTH_SECTIONS, IDENTiFICATION_TYPE, PATTERN_EMAIL } from '@/app/constants/auth'
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import BaseRadioInput from '@/views/components/inputs/BaseRadioInput.vue'
import BaseButton from '@/views/components/BaseButton.vue'

const emit = defineEmits(['next'])

const props = defineProps({
  payload: Object
})

const options = [
  { label: 'Pessoa física', value: IDENTiFICATION_TYPE.CPF },
  { label: 'Pessoa juridica', value: IDENTiFICATION_TYPE.CNPJ }
]

const payload = reactive({
  email: props.payload.email,
  type: props.payload.type
})

function submit() {
  const nextSection =
    payload.type === IDENTiFICATION_TYPE.CPF ? AUTH_SECTIONS.PERSON : AUTH_SECTIONS.COMPANY
  emit('next', { payload, nextSection })
}
</script>

<style lang="scss" scoped>
.section-email {
  &__title {
    margin-bottom: 1.25rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
}
</style>
