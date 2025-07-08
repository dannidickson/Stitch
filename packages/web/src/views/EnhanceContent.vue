<template>
  <div class="patterns-list__container">
    <div class="patterns-list">
      <div class="pattern-group" v-for="templateGroup in templates" :key="templateGroup.type">
        <div class="pattern__header">
          <div class="pattern__title" :id="`scrollTo-${templateGroup.type}`">
            {{ templateGroup.title }}
          </div>
        </div>

        <div class="pattern__template" v-for="template in templateGroup.items" :key="template.name">
          <div class="pattern__template-header">
            <div class="pattern__template-title">
              {{ template.name }}
            </div>
            <div class="pattern__template-button">
              <button class="button button--outline" :class="{'button--selected': isPatternAdded(templateGroup, template)}" @click="togglePattern(templateGroup, template)">
                <span v-if="isPatternAdded(templateGroup, template)">Added</span>
                <span v-else>Add</span>
              </button>
            </div>
          </div>

          <iframe
          class="patterns__preview-frame"
          :src="template.templatePath"
          frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { storeToRefs } from 'pinia';
import templates from '../../../../packs/stitch-pack/config/templates.json';
import { useStateStore } from '../stores/state';
import { nextTick } from 'vue';

const stateStore = useStateStore();
const { state } = storeToRefs(stateStore);

const isPatternAdded = (pattern: any, patternTemplate: any) => {
  const { type } = pattern;
  return state.value.patterns[type].includes(patternTemplate);
}

const togglePattern = (pattern: any, patternTemplate: any) => {
  const { type } = pattern;
  const arr = state.value.patterns[type];
  const idx = arr.indexOf(patternTemplate);
  if (idx === -1) {
    arr.push(patternTemplate);
  } else {
    arr.splice(idx, 1);
  }
}

/**
 * Scroll to a pattern group by type
 */
const scrollToGroup = async (type: string) => {
  await nextTick();
  const el = document.getElementById(`scrollTo-${type}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Expose scrollToGroup for parent usage
// @ts-ignore
if (typeof defineExpose === 'function') {
  defineExpose({ scrollToGroup });
}
</script>

<style scoped>
.patterns-list__container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
.patterns-list {
  max-width: 700px;
  width: 100%;
}
.pattern__template-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pattern__template-button {
  margin-left: 1rem;
}
</style>
