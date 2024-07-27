<template>
  <form ref="passForm" class="section-password" @submit.prevent="submit">
    <slot>
      <h2 class="section-password__title">Senha de acesso</h2>
    </slot>

    <div class="section-password__form">
      <base-input
        v-model="payload.password"
        :pattern="PATTERN_PASSWORD"
        id="password"
        type="password"
        label="Sua senha"
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
import { reactive, ref } from 'vue'
import { AUTH_SECTIONS, IDENTiFICATION_TYPE, PATTERN_PASSWORD } from '@/app/constants/auth'
import BaseButton from '@/views/components/BaseButton.vue'
import BaseInput from '@/views/components/inputs/BaseInput.vue'

const props = defineProps({
  payload: Object
})

const passForm = ref(null)

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

<style lang="scss">
.section-password {
  &__title {
    margin-bottom: 1.25rem;
  }

  &__buttons {
    margin-top: 1.25rem;
    display: flex;
    flex-direction: row;
    flex: 1;
    gap: 1rem;
  }
}
</style>
