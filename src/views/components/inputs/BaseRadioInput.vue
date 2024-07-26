<template>
  <div class="select-input">
    <fieldset :class="[direction]">
      <div v-for="(option, index) in optionsFormatted" :key="index">
        <input
          type="radio"
          v-model="value"
          :id="option.label"
          :name="option.label"
          :value="option.value"
        />
        <label :for="option.label">{{ option.label }}</label>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { computed } from 'vue'
defineEmits(['onChange', 'update:modelValue'])

const value = defineModel()

const props = defineProps({
  options: {
    type: Array
  },
  direction: {
    type: String,
    default: 'row',
    validator(value) {
      return ['row', 'column'].includes(value)
    }
  }
})

const optionsFormatted = computed(() => {
  return props.options.map((option) => ({
    label: option.label,
    value: option.value ?? option.label
  }))
})
</script>

<style lang="scss" scoped>
.select-input {
  .row {
    align-items: center;
  }
  .column {
    flex-direction: column;
  }

  fieldset {
    padding-left: unset;
    display: flex;
    justify-content: space-between;
    border: none;

    input {
      margin-right: 0.2rem;
    }
  }
}
</style>
