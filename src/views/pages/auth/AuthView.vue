<template>
  <section class="auth">
    <div class="auth__container">
      <transition :name="transition" mode="out-in">
        <component
          :is="currentSection"
          :payload
          :loading
          @next="handleNext"
          @back="handleBack"
          @submit-payload="handleSubmit"
        />
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, shallowRef, watch } from 'vue'
import FormEmail from './components/FormEmail.vue'
import FormPerson from './components/FormPerson.vue'
import FormPassword from './components/FormPassword.vue'
import FormCompany from './components/FormCompany.vue'
import FormReview from './components/FormReview.vue'
import SectionSuccess from './components/SectionSuccess.vue'

import { AUTH_SECTIONS, IDENTiFICATION_TYPE } from '@/app/constants/auth'
import authService from '@/app/services/authService'

const SECTION_ENUM = {
  [AUTH_SECTIONS.EMAIL]: FormEmail,
  [AUTH_SECTIONS.PERSON]: FormPerson,
  [AUTH_SECTIONS.PASSWORD]: FormPassword,
  [AUTH_SECTIONS.COMPANY]: FormCompany,
  [AUTH_SECTIONS.REVIEW]: FormReview,
  [AUTH_SECTIONS.SUCCESS]: SectionSuccess
}

const payload = ref({
  email: null,
  type: IDENTiFICATION_TYPE.CPF,
  name: null,
  identification: null,
  date: null,
  phone: null,
  password: null
})

const currentSection = shallowRef(SECTION_ENUM.EMAIL)
const loading = shallowRef(true)
const transition = shallowRef('go')

function handleNext({ payload: values, nextSection }) {
  transition.value = 'go'
  payload.value = Object.assign(payload.value, values)
  currentSection.value = SECTION_ENUM[nextSection]
}

function handleBack(backSection) {
  transition.value = 'back'
  currentSection.value = SECTION_ENUM[backSection]
}

function handleSubmit({ payload: values }) {
  loading.value = true
  authService
    .createUser(Object.assign(payload.value, values))
    .then(() => {
      transition.value = 'go'
      currentSection.value = SECTION_ENUM[AUTH_SECTIONS.SUCCESS]
    })
    .finally(() => (loading.value = false))
}

watch(
  () => payload.value.type,
  () =>
    (payload.value = Object.assign(payload.value, {
      name: null,
      identification: null,
      date: null,
      phone: null
    }))
)
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    padding: 2.5rem;
    background-color: white;
    border-radius: 1.5rem;
    width: 25rem;
  }

  &__button {
    margin-top: 0.5rem;
  }
}

.go-enter-active,
.go-leave-active {
  transition: all 0.25s ease-out;
}

.go-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.go-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.back-enter-active,
.back-leave-active {
  transition: all 0.25s ease-out;
}

.back-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.back-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
