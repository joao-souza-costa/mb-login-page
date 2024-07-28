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
      :autocomplete="autoComplete"
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
import {
  DATE_INPUT_MESSAGES,
  GENERAL_INPUT_MESSAGES,
  PASSWORD_INPUT_MESSAGES
} from '@/app/constants/messages'
import { getInputErrorKey } from '@/app/utils/error'
import { ref } from 'vue'

const MESSAGES = {
  password: PASSWORD_INPUT_MESSAGES,
  date: DATE_INPUT_MESSAGES
}
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
  autoComplete: {
    type: String,
    default: null
  },
  minlength: {
    type: String,
    default: null
  }
})

function validateInput({ target }) {
  const { validity } = target

  if (validity.valid) {
    error.value = false
    return (message.value = '')
  }

  error.value = true

  return (message.value = handleMessage(validity))
}

function handleMessage(validity) {
  const key = getInputErrorKey(validity)
  return MESSAGES[props.type]?.[key] || GENERAL_INPUT_MESSAGES[key].replace('$1', props.example)
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
