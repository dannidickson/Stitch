<template>
  <div class="step">
    <div class="step-menu">
      <header class="step-menu__header">
        <h1 class="step-menu__title">{{ props.title }}</h1>
        <div class="step-menu__description">{{ props.description }}</div>
      </header>
      <div class="step-menu__content">
        <slot name="menuContent"></slot>
      </div>
      <footer class="step-menu__footer">
        <button class="button button--outline button--previous" v-if="props.previousStep" @click="setStep(props.previousStep)">Previous</button>
        <button class="button button--dark button--next" v-if="props.nextStep" @click="setStep(props.nextStep)">Next</button>
      </footer>
    </div>

    <div class="step-content">
        <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStateStore } from '../stores/state';

const stateStore = useStateStore();
const { setStep } = stateStore;
const props = defineProps(['title', 'description', 'nextStep', 'previousStep']);
</script>
