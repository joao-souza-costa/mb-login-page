<template>
  <base-form title="Seja bem vindo (a)" current-step="1" steps="4" @submit="submit">
    <div class="form-email">
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

    <template #button>
      <base-button text="continuar" />
    </template>
  </base-form>
</template>

<script setup>
import { reactive } from 'vue'
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import BaseRadioInput from '@/views/components/inputs/BaseRadioInput.vue'
import BaseButton from '@/views/components/BaseButton.vue'
import BaseForm from '@/views/components/BaseForm.vue'
import { AUTH_SECTIONS, IDENTiFICATION_TYPE, PATTERN_EMAIL } from '@/app/constants/auth'

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
.form-email {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
</style>
