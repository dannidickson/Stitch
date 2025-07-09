import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface PresetInterface {
  title: string,
  description: string,
}

interface PatternsInterface {
  layouts: string[],
  blocks: string[],
  includes: string[],
}

export const useStateStore = defineStore('state', () => {
  const state = ref({
    projectDir: '',
    projectName: '',
    version: '5',
    useDDEV: true,
    installAlong: true,
    modules: [],
    selectedPreset: {} as PresetInterface,
    usePatterns: true,
    allowPlugins: true,
    patterns: {} as PatternsInterface,
    pageSearch: '',
    selectedPageType: '',
    experienceType: '',
  })

  const setupWizard = ref('skip')
  const currentStep = ref('welcome')
  const showSteps = ref<Boolean>(false)

  const totalNavSteps = ref(4);
  const currentNavStep = ref(0);

  const isStep = (step: string) => {
    return currentStep.value === step
  }

  const setStep = (step: string) => {
    currentStep.value = step

    if (step === 'basics') {
      showSteps.value = true
    }

    if (step === 'welcome') {
      showSteps.value = false
    }

    currentNavStep.value++;
  }

  return {
    state,
    setupWizard,
    currentStep,
    showSteps,
    totalNavSteps, 
    currentNavStep,
    isStep,
    setStep,
  }
})
