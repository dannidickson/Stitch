<template>
  <div class="stitch-holder">
    <div class="landing-view" v-if="isStep('welcome')">
      <h1>Welcome to Stitch</h1>
      <p class="summary">Jump start a project within a few clicks</p>
      <button class="button button--landing" @click="setStep('about')">Start</button>
    </div>

    <div class="step__holder" v-for="step in steps" v-if="!isStep('welcome')">
      <Transition name="slide-fade">
        <Step
          :title="step.Title"
          :description="step.Description"
          :next-step="step.NextStep"
          :previous-step="step.PreviousStep"
          v-if="isStep(step.Key)"
        >
          <template #menuContent>
            <div class="form" v-if="step.Key === 'about'">
              <div class="form-control form-control--input">
                <label class="form-label" for="siteName">Site Name</label>
                <input
                  class="form-input"
                  id="siteName"
                  type="text"
                  required
                  v-model="state.projectName"
                />
              </div>
  
              <div class="form-control form-control--input">
                <label class="form-label" for="projectDir">Project directory</label>
                <input
                  class="form-input"
                  id="projectDir"
                  placeholder=""
                  type="text"
                  required
                  v-model="state.projectDir"
                />
                <p class="form-description form-description--full">
                  Leaving this blank will create the project with backpack itself
                </p>
              </div>
  
              <div class="form-control">
                <label class="form-label" for="version">Version</label>
                <p class="form-description">Using latest silverstripe/installer</p>
              </div>
  
              <div class="form-control">
                <label class="form-label" for="useDDEV">Use DDEV?</label>
                <input type="checkbox" id="useDDEV" required v-model="state.useDDEV" />
              </div>
  
              <div class="form-control">
                <label class="form-label" for="installAlong">Install the project as we go?</label>
                <input type="checkbox" id="installAlong" required v-model="state.installAlong" />
                <p class="form-description form-description--full">
                  If you dont select this, we will give you a command to run in the terminal
                </p>
              </div>
            </div>

            <div class="form" v-if="step.Key === 'blast'">

              <div class="card-setup-group">

                <div class="card">
                  <div class="card__title">Simple: default</div>
                  <p>The default from silverstripe/installer</p>
                  <p>Pick this if you want to customize and configure your own page types</p>
                </div>
  
                <div class="card">
                  <div class="card__title">Jumpstart</div>
                  <p>Recommended for most content focused, brochure type sites</p>
                  <p>Pages: Campaign, Full & Restricted width Content</p>
                  <p>Elements: CTA, Accordion, Image Text </p>
                </div>
              </div>
            </div>

            <ConfigureModule v-if="step.Key === 'config'" />

            <div class="form" v-if="step.Key === 'directions'">

              <div class="card-setup-group">

                <div class="card">
                  <div class="card__title">Select</div>
                  <p>Select some patterns to add to your site? You will need to peice them together afterwards</p>
                </div>
  
                <div class="card">
                  <div class="card__title">Select and stitch</div>
                  <p>Select and customize the patterns / blocks go and on which page types</p>
                </div>

                <div class="card">
                  <div class="card__title">Skip and ship</div>
                  <p>Alternatively, you skip this step entirely and finish</p>
                </div>
              </div>
            </div>
          </template>
  
          <template #content>
            <component :is="step.MenuContent" />
          </template>
        </Step>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import Step from './views/Step.vue'
import AboutContent from './views/AboutContent.vue'

import { useStateStore } from './stores/state'
import { storeToRefs } from 'pinia'
import ConfigureModule from './components/steps/ConfigureModule.vue'
const stateStore = useStateStore()
const { isStep, setStep } = stateStore
const { state } = storeToRefs(stateStore)
const { currentStep } = storeToRefs(stateStore)

const steps = [
  {
    Key: 'about',
    Title: '1. About the site',
    Description: 'First thing, tell us about your new site',
    NextStep: 'blast',
    PreviousStep: false,
    MenuContent: AboutContent,
  },
  {
    Key: 'blast',
    Title: '2. Basecamp',
    PreviousStep: 'about',
    NextStep: 'config',
    Description: 'Select a base pack to start with',
  },
  {
    Key: 'config',
    Title: '3. Configure modules',
    PreviousStep: 'blast',
    NextStep: 'directions',
    Description: 'Select some Silverstripe modules for your site',
  },
    {
    Key: 'directions',
    Title: '4. Next steps',
    PreviousStep: 'config',
    NextStep: false,
    Description: 'Continue the setup by configuring some pages using the packs ',
  },
]
</script>
