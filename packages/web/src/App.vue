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
          :next-step="
            typeof step.NextStep === 'object' && 'value' in step.NextStep
              ? step.NextStep.value
              : step.NextStep
          "
          :previous-step="
            typeof step.PreviousStep === 'object' && 'value' in step.PreviousStep
              ? step.PreviousStep.value
              : step.PreviousStep
          "
          v-if="isStep(step.Key)"
        >
          <template #menuContent>
            <div class="form" v-if="isStep('about')">
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
                <label class="toggle-switch">
                  <input type="checkbox" id="useDDEV" required v-model="state.useDDEV" />
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="form-control">
                <label class="form-label" for="installAlong">Install the project as we go?</label>
                <label class="toggle-switch">
                  <input type="checkbox" id="installAlong" required v-model="state.installAlong" />
                  <span class="toggle-slider"></span>
                </label>
                <p class="form-description form-description--full">
                  If you dont select this, we will give you a command to run in the terminal
                </p>
              </div>
            </div>

            <div class="form" v-if="isStep('blast')">
              <div class="card-setup-group">
                <div class="card" 
                  v-for="packPreset in packConfig.presets"
                  :class="{ 'card--selected': packPreset.key === state.selectedPreset.key }"
                  @click="setPreset(packPreset)"
                >
                  <div class="card__title">{{ packPreset.title }}</div>
                  <p>{{ packPreset.description }}</p>
                </div>
              </div>
            </div>

            <ConfigureModule v-if="isStep('config')" />

            <div class="form" v-if="isStep('selectSetup')">
              <div class="card-setup-group">
                <div
                  class="card"
                  :class="{ 'card--selected': state.experienceType === 'select' }"
                  @click="selectExperienceType('select')"
                >
                  <div class="card__title">Select</div>
                  <p>
                    Select some patterns to add to your site? You will need to peice them together
                    afterwards
                  </p>
                </div>

                <div
                  class="card"
                  :class="{ 'card--selected': state.experienceType === 'stitch' }"
                  @click="selectExperienceType('stitch')"
                >
                  <div class="card__title">Select and stitch</div>
                  <p>Select and customize the patterns / blocks go and on which page types</p>
                </div>

                <div
                  class="card"
                  :class="{ 'card--selected': state.experienceType === 'skip' }"
                  @click="selectExperienceType('skip')"
                >
                  <div class="card__title">Skip and ship</div>
                  <p>Alternatively, you skip this step entirely and finish</p>
                </div>
              </div>
            </div>

            <div class="form" v-if="isStep('enhance')">
              <div class="card" v-for="templateGroup in templates" @click="scrollToItem(templateGroup.type)">
                  <div class="card__title">{{ templateGroup.title }}</div>
              </div>
            </div>

            <div class="form" v-if="isStep('experience')">
              <div class="form-control form-control--input">
                <label class="form-label" for="pageSearch">Search Pages</label>
                <input
                  class="form-input"
                  id="pageSearch"
                  type="text"
                  placeholder="Search pages..."
                  v-model="state.pageSearch"
                />
              </div>

              <div class="form-control">
                <label class="form-label" for="pageType">Page Type</label>
                <select class="form-select" id="pageType" v-model="state.selectedPageType">
                  <option value="">All Pages</option>
                  <option value="content">Content Pages</option>
                  <option value="landing">Landing Pages</option>
                  <option value="utility">Utility Pages</option>
                </select>
              </div>

              <div class="card-setup-group">
                <div class="card">
                  <div class="card__title">Available Pages</div>
                  <p>Select from the list of available page templates</p>
                </div>
              </div>
            </div>

            <div class="form" v-if="isStep('finished')">
              <div class="card-setup-group">
                <div class="card">
                  <div class="card__title">Finished</div>
                  <p>Your site is ready to go! You can now start building your site</p>
                </div>
              </div>
            </div>
          </template>

          <template #content>
            <component :is="step.MenuContent" v-if="step.MenuContent" />

            <Transition name="slide-patterns" mode="out-in">
              <section class="step__content" v-if="isStep('blast')">
                <div class="card" v-if="!state.selectedPreset">
                  <div class="card__title">Nothing to see</div>
                </div>
                <div v-else>
                  <div class="card__title">{{ state.selectedPreset.title }}</div>
                  <div class="card__description">{{ state.selectedPreset.description }}</div>
                </div>
              </section>
            </Transition>
            
            <Transition name="slide-patterns" mode="out-in">              
              <section class="step__content" v-if="isStep('selectSetup')">
                <div class="setup-preview setup-preview--image">
                  <img src="./assets/images/patterns/image-text.svg" />
                </div>
                <div class="setup-preview setup-preview--accordion">
                  <img src="./assets/images/patterns/accordion.svg" />
                </div>
                <div class="setup-preview setup-preview--cta">
                  <img src="./assets/images/patterns/cta.svg" />
                </div>
              </section>
            </Transition>
          </template>
        </Step>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import Step from './views/Step.vue'
import AboutContent from './views/AboutContent.vue'
import EnhanceContent from './views/EnhanceContent.vue'
import ExperienceContent from './views/ExperienceContent.vue'
import FinishedContent from './views/FinishedContent.vue'
import templates from '../../../packs/stitch-pack/config/templates.json';
import packConfig from '../../../packs/stitch-pack/config/modules.json';

import { useStateStore } from './stores/state'
import { storeToRefs } from 'pinia'
import ConfigureModule from './components/steps/ConfigureModule.vue'
import { computed } from 'vue'


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
    NextStep: 'selectSetup',
    Description: 'Select some Silverstripe modules for your site',
  },
  {
    Key: 'selectSetup',
    Title: '4. Next steps',
    PreviousStep: 'config',
    NextStep: computed(() => (state.value.experienceType === 'skip' ? 'finished' : 'enhance')),
    Description: 'Continue the setup by configuring some pages using the packs ',
  },
  {
    Key: 'enhance',
    Title: '5. Enhance your site',
    PreviousStep: 'selectSetup',
    NextStep: 'experience',
    Description: 'Add pages and sections to your site from available templates',
    MenuContent: EnhanceContent,
  },
  {
    Key: 'experience',
    Title: '6. Enhance the Experience',
    PreviousStep: 'enhance',
    NextStep: 'finished',
    Description: 'Configure additional features and functionality',
    MenuContent: ExperienceContent,
  },
  {
    Key: 'finished',
    Title: 'Finished',
    PreviousStep: computed(() =>
      state.value.experienceType === 'skip' ? 'selectSetup' : 'experience',
    ),
    NextStep: false,
    Description: 'Your site is ready to go!',
    MenuContent: FinishedContent,
  },
]

const selectExperienceType = (type: string) => {
  state.value.experienceType = type
}

const setPreset = (presetPack: object) => {
  state.value.selectedPreset = presetPack;
}

/**
 * Scrolls to the position
 * @param type 
 */
const scrollToItem = (type: string) => {
  document.querySelector(`scrollTo${type}`)?.scrollTo();
}
</script>

<style></style>
