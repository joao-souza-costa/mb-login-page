<template>
  <div class="input">
    <label :for="id">{{ label }}</label>

    <input
      ref="el"
      v-model.trim="model"
      :id
      :type
      :required
      :pattern
      :min
      :max
      :minlength
      :class="[$attrs.class, error && 'error']"
      @input.stop="validateInput"
      @invalid.prevent="validateInput"
    />

    <div class="input__error">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ERROR_MESSAGES } from '@/app/constants/input'
import { getErrorKey } from '@/app/utils/error'
import { ref } from 'vue'

const model = defineModel()

const el = ref(null)
const message = ref('')
const error = ref(false)

const props = defineProps({
  id: {
    type: String
  },
  label: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  pattern: {
    type: String,
    default: null
  },
  example: {
    type: String,
    default: null
  },
  min: {
    type: String,
    default: null
  },
  max: {
    type: String,
    default: null
  },
  minlength: {
    type: String,
    default: null
  }
})

function validateInput({ target }) {
  //TODO: Melhorar as mensagens desse método
  const { validity, validationMessage } = target

  if (validity.valid) {
    error.value = false
    return (message.value = '')
  }

  el.value.setCustomValidity('')
  const key = getErrorKey(validity)

  console.log({ key, validationMessage })

  error.value = true

  if (key.includes('Missing')) return (message.value = ERROR_MESSAGES[key])

  if (key.includes('Short'))
    return (message.value = `${ERROR_MESSAGES[key]} ${props.minlength} caracteres`)

  return (message.value = `${ERROR_MESSAGES[key]} ${props.example}`)
}
</script>

<style lang="scss" scoped>
.input {
  display: inline-block;
  position: relative;
  width: 100%;

  input {
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.3rem;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='date'] {
    cursor: text;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }

  input.error:invalid,
  input.error {
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }

  &__error {
    margin-top: 5px;
    padding-left: 2px;

    & > p {
      font-size: 0.75rem;
      color: var(--color-primary);
    }
  }
}
</style>
