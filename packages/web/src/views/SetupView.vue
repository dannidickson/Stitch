<template>
    <div class="backpack-sidebar__content">
      <div class="backpack-section__header">
        <h2 class="h2 backpack-section__title">Continue Setup?</h2>
      </div>
      <div class="backpack-section__content">
        <div class="card-setup-group">
          <div
            class="card"
            :class="{ 'card--selected': setupWizard === 'patterns' }"
            @click="selectSetupWizard('patterns')"
          >
            <h3 class="card__title">
              <span class="icon icon-copy"></span>
              Select
            </h3>
            <p>Select some patterns to add to your site?</p>
            <p>You will need to peice them together afterwards</p>
          </div>

          <div
            class="card"
            :class="{ 'card--selected': setupWizard === 'stitch' }"
            @click="selectSetupWizard('stitch')"
          >
              <h3 class="card__title">
              <span class="icon icon-edit"></span>
              Select and Stitch
            </h3>
            <p>Select some patterns to add to your site?</p>
            <p>Customize where these patterns / blocks go and on which page types</p>
          </div>

          <div
            class="card"
            :class="{ 'card--selected': setupWizard === 'skip' }"
            @click="selectSetupWizard('skip')"
          >
            <h3 class="card__title">
              Skip step
            </h3>
            <p>Alternatively, you skip this step entirely and finish</p>
          </div>
        </div>
      </div>

      <div class="card card--setup-note">
        <h3 class="card__title">
          <span class="icon icon-note card--note"></span>
          Note
        </h3>
        <p>
          Use patterns if you know you're going to be doing a lot of customizations. If you want to
          use both, select Apply and Configure, and add patterns.
        </p>
      </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStateStore } from '../stores/state'
const stateStore = useStateStore()
const { setupWizard } = storeToRefs(stateStore)

const selectSetupWizard = (selectedSetup: string) => {
  setupWizard.value = selectedSetup
}
</script>
