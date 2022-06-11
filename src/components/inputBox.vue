<script setup>
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import useField from "../composables/useField";
const props = defineProps([
  "modelValue",
  "label",
  "boxClasses",
  "validations",
  "validationErrors",
]);
const emit = defineEmits(["update:modelValue", "update:validationErrors"]);
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const validationErrors = computed({
  get: () => props.validationErrors,
  set: (value) => emit("update:validationErrors", value),
});
const validated = useField(value, props.validations);
watch(validated, (newErrors) => {
  validationErrors.value = validated.errors;
});
</script>
<template>
  <div class="input-box" :class="props.boxClasses">
    <label class="" for="name"> {{ props.label }}</label>
    <div
      class="input-box__wrapper"
      :class="[{ 'border-red-400': validated.errors.length > 0 }]"
    >
      <input type="text" v-model="value" />
      <button v-if="value" @click="value = ''">
        <svg
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="w-6 h-6 text-gray-400 fill-current"
        >
          <g>
            <path
              d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z    M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8   l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76   l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7   c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"
            />
          </g>
        </svg>
      </button>
    </div>
    <div
      class="flex flex-col text-xs font-light text-red-500 p-2"
      v-if="validated.errors"
    >
      <p v-for="error in validated.errors" :key="error">{{ error }}</p>
    </div>
  </div>
</template>
<style>
.input-box {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  @apply w-full md:w-[32%];
}
.input-box input {
  border-radius: 0;
  border: 0;
  @apply p-2 focus-visible:outline-none;
}
.input-box label {
  @apply text-sm pb-2 pt-4;
}
.input-box__wrapper {
  @apply p-2 flex flex-row border-2 focus-within:border-primary rounded-md;
}
.input-box__wrapper > input {
  @apply w-full font-bold caret-primary;
}
@media (min-width: 768px) {
  .occupy-2 {
    width: 65%;
  }
}
</style>
