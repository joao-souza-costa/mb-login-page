<template>
  <base-form title="Senha de acesso" current-step="3" steps="4" @submit="submit">
    <base-input
      v-model="payload.password"
      :pattern="PATTERN_PASSWORD"
      id="password"
      type="password"
      label="Sua senha"
      auto-complete="new-password"
      required
    />
    <template #button>
      <base-button text="voltar" variant="light" @click.prevent="handleBack" />
      <base-button text="continuar" />
    </template>
  </base-form>
</template>

<script setup>
import { reactive } from 'vue'
import BaseButton from '@/views/components/BaseButton.vue'
import BaseInput from '@/views/components/inputs/BaseInput.vue'
import BaseForm from '@/views/components/BaseForm.vue'
import { AUTH_SECTIONS, IDENTiFICATION_TYPE, PATTERN_PASSWORD } from '@/app/constants/auth'

const props = defineProps({
  payload: Object
})

const payload = reactive({
  password: props.payload.password
})

const emit = defineEmits(['next', 'back'])

function submit() {
  emit('next', { payload, nextSection: AUTH_SECTIONS.REVIEW })
}

function handleBack() {
  if (props.payload.type === IDENTiFICATION_TYPE.CPF) return emit('back', AUTH_SECTIONS.PERSON)

  return emit('back', AUTH_SECTIONS.COMPANY)
}
</script>
