<template>
  <div class="backpack-sidebar__content">
    <div class="backpack-section__header">
      <h2 class="h1 backpack-section__title">The basics</h2>
      <p class="backpack-section__description">Tell us about the site</p>
    </div>

    <div class="backpack-section__content">
      <div class="form-control form-control--input">
        <label class="form-label" for="siteName">Site Name</label>
        <input class="form-input" id="siteName" type="text" required v-model="state.projectName" />
      </div>

      <div class="form-control form-control--input">
        <label class="form-label" for="projectDir">Project directory</label>
        <input class="form-input" id="projectDir" placeholder="" type="text" required v-model="state.projectDir" />
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
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStateStore } from '../stores/state'

const stateStore = useStateStore()
const { state } = storeToRefs(stateStore)
</script>
