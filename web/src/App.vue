<template>
  <div class="logo-background"></div>
  <div class="button button--dark backpack-terminal" v-if="state.installAlong && !isStep('welcome')">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-terminal-icon lucide-terminal"><path d="M12 19h8"/><path d="m4 17 6-6-6-6"/></svg>
  </div>
  <div class="backpack">
    <SideView />

    <div class="backpack-section backpack-section--welcome" v-if="isStep('welcome')">
      <h1>Welcome to backpack</h1>
      <p>Jump start a Silverstripe project within a few clicks</p>

      <footer class="backpack-section__footer">
        <button class="button button--dark" @click="setStep('basics')">
          Get started
          <span class="icon icon-arrow"></span>
        </button>

        <button class="button button--outline" @click="startCLIProcess()">CLI process</button>
      </footer>

      <div class="output" ref="outputRef"></div>
    </div>

    <Transition name="slide-module-content">
      <section
        class="backpack-section"
        style="position: absolute; right: -100px"
        v-if="isStep('modules')"
      >
        <div class="backpack-section__content">
          <div class="modules-section composer-ui">
            <code>
              <pre>
  
                  <span class="composer-ui--grey">// composer.json </span>
                  "require": {
                    <span v-for="module in state.modules" class="composer-ui--green">"{{ module }}": <span class="composer-ui--blue">"*"</span>,
                    </span>}
  
                </pre>
            </code>
          </div>
        </div>
      </section>
    </Transition>

    <Transition name="slide-patterns" mode="out-in">
      <section class="backpack-section" v-if="isStep('setups')">
        <div class="backpack-section__content">
          <div class="setup-preview setup-preview--image">
            <img src="./assets/images/patterns/image-text.svg" />
          </div>
          <div class="setup-preview setup-preview--accordion">
            <img src="./assets/images/patterns/accordion.svg" />
          </div>
          <div class="setup-preview setup-preview--cta">
            <img src="./assets/images/patterns/cta.svg" />
          </div>
        </div>
      </section>
    </Transition>

    <section class="backpack-section backpack-section--patterns" v-if="isStep('patterns')">
      <div class="backpack-section__header">
        <h2 class="backpack-section__title">All patterns</h2>
        <div class="button button-group">
          <button
            class="button"
            :class="{
              'button--plain': viewToggleState !== 'row',
              'button--selected': viewToggleState === 'row',
            }"
            @click="viewToggleState = 'row'"
          >
            <span class="icon icon-row"></span>
          </button>

          <button
            class="button button--plain"
            :class="{
              'button--plain': viewToggleState !== 'column',
              'button--selected': viewToggleState === 'column',
            }"
            @click="viewToggleState = 'column'"
          >
            <span class="icon icon-column"></span>
          </button>
        </div>
      </div>

      <div class="backpack-section__content">
        <div class="patterns-list">
          <div class="pattern-group" v-for="pattern in patterns">
            <h2 class="pattern-group__title">{{ pattern.title }}</h2>
            <div
              class="pattern-templates"
              :class="{ 'pattern-templates--column': viewToggleState === 'column' }"
            >
              <div class="pattern" v-for="pattermTemplate in patternTemplates[pattern.type]">
                <div class="pattern-template__header">
                  <div class="pattern-template__title">
                    {{ pattermTemplate.name }}
                  </div>
                  <div class="pattern-template__button">
                    <button
                      class="button button--outline"
                      @click="addPattern(pattern, pattermTemplate)"
                    >
                      <span v-if="state.patterns.layouts.includes(pattermTemplate.location)"
                        >Added</span
                      >
                      <span v-else>Add</span>
                    </button>
                  </div>
                </div>
                <iframe
                  class="patterns__preview-frame"
                  :src="pattermTemplate.templatePath"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="backpack-section backpack-section--finished" v-if="isStep('finished')">
      <div class="backpack-header">
        <h1>Finished</h1>

        <button @click="createProject()" class="button button--dark">Create project</button>
      </div>
    </section>
  </div>
</template>
<style scoped>
.wireframe-border {
  fill: none;
  stroke: #4a5568;
  stroke-width: 2;
}
.squiggle {
  fill: none;
  stroke: #4a5568;
  stroke-width: 2;
  stroke-linecap: round;
}
.light-bg {
  fill: #edf2f7;
}
.label {
  font-family: sans-serif;
  font-size: 14px;
  fill: #4a5568;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BasicsView from './views/BasicsView.vue'

import { useStateStore } from './stores/state'
import ModulesView from './views/ModulesView.vue'
import SetupView from './views/SetupView.vue'
import SideView from './views/SideView.vue'

const stateStore = useStateStore();
const { state, setupWizard, showSteps } = storeToRefs(stateStore);
const { isStep, setStep } = stateStore;
const outputRef = ref('')
const viewToggleState = ref('row')

let socket

// patterns example
const patterns = [
  {
    title: 'Layouts',
    type: 'layouts',
  },
  {
    title: 'Sections',
    type: 'sections',
  },
  {
    title: 'Blocks',
    type: 'blocks',
  },
]

const patternTemplates = {
  layouts: [
    {
      name: 'Full width',
      templatePath: '/packages/backpack/templates/FullWidth.html',
      location: '/PageTemplates/FullWidthPage/',
    },
    {
      name: 'Restricted width',
      templatePath: '/packages/backpack/templates/RestrictedWidth.html',
      location: '/PageTemplates/RestrictedWidthPage/',
    },
  ],
  sections: {},
  blocks: {},
}


const startCLIProcess = async () => {
  socket.send('CLI')
  outputRef.value.textContent = ''
}

const addPattern = (pattern, patternTemplate) => {
  const { type } = pattern
  state.value.patterns.layouts.push(patternTemplate.location)
  console.log(state.value.patterns)
}

const createProject = () => {
  fetch('/createProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err))
}

// onMounted(() => {
//   outputRef.value.textContent = '';
//   socket = new WebSocket(`ws://${location.host}/ws`);

//   socket.onopen = function(e) {
//     console.log("[open] Connection established");
//     console.log("Sending to server");
//     socket.send("My name is John");
//   };

//   socket.onmessage = function(event) {
//     console.log(`[message] Data received from server: ${event.data}`);
//   };

//   socket.onclose = function(event) {
//     if (event.wasClean) {
//       console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//     } else {
//       // e.g. server process killed or network down
//       // event.code is usually 1006 in this case
//       console.log('[close] Connection died');
//     }
//   };

//   socket.onerror = function(error) {
//     alert(`[error]`);
//   };
// })
</script>
