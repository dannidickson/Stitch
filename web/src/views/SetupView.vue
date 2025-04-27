<template>
    <div class="backpack-sidebar__content">
      <div class="backpack-section__header">
        <h2 class="backpack-section__title">Use patterns?</h2>
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
              Patterns
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
              Stitch
            </h3>
            <p>Stitch together the patterns in a builder UI.</p>
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
          use both, select Stitch, and add patterns.
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
