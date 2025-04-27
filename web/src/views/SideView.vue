<template>
    <div
      class="backpack-sidebar"
      :class="{ 'backpack-sidebar--ui': isStep('patterns') }"
      v-if="showSteps"
    > 
      <div class="backpack-sidebar__container" v-if="!isStep('patterns')">
        <div class="backpack-sidebar__header">
          <h1>Backpack</h1>
          <ul class="backpack-steps">
            <li 
              class="backpack-step" 
              :class="{'backpack-step--selected': currentNavStep === step}"
              v-for="step in totalNavSteps"
              ></li>
          </ul>
        </div>
        <Transition name="slide-fade" mode="out-in">
          <BasicsView v-if="isStep('basics')" />
        </Transition>
        <Transition name="slide-fade" mode="out-in">
          <ModulesView v-if="isStep('modules')" />
        </Transition>
        <Transition name="slide-fade" mode="out-in">
          <SetupView v-if="isStep('setups')" />
        </Transition>
      </div>

      <div class="backpack-sidebar__container" v-if="isStep('patterns')">
        <h1>Patterns</h1>
        <div class="backpack-sidebar__content">
          <div class="backpack-section__header"></div>
          <div class="backpack-section__content"></div>
        </div>
      </div>

      <div class="backpack-sidebar__footer">
        <div class="backpack-sidebar__footer" v-if="isStep('basics')">
          <button class="button button--dark" @click="setStep('modules')">Next</button>
        </div>

        <div class="backpack-sidebar__footer" v-if="isStep('modules')">
          <button class="button button--dark" @click="setStep('setups')">Next</button>
        </div>

        <div class="backpack-sidebar__footer" v-if="isStep('setups')">
          <button class="button button--link" @click="setStep('finish')">Skip</button>
          <button class="button button--dark" @click="setStep(setupWizard)">Next</button>
        </div>

        <div class="backpack-sidebar__footer" v-if="isStep('patterns')">
          <button class="button button--link" @click="setStep('finished')">Skip</button>
          <button class="button button--dark" @click="setStep('finished')">Next</button>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BasicsView from './BasicsView.vue';

import { useStateStore } from '../stores/state'
import ModulesView from './ModulesView.vue'
import SetupView from './SetupView.vue'

const stateStore = useStateStore();
const { setupWizard, showSteps, totalNavSteps, currentNavStep } = storeToRefs(stateStore);
const { isStep, setStep } = stateStore;

</script>