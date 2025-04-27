<template>
  <div class="backpack-sidebar__content">
    <div class="backpack-section__header">
      <h2 class="backpack-section__title">Add modules</h2>
      <p class="backpack-section__description">Pick a selection of modules</p>
    </div>
    <div class="backpack-section__content">
      <div class="backpack-search">
        <div class="form-group">
          <div class="form-control">
            <input class="form-input backpack-search__input" type="text" />
          </div>
          <div class="form-control">
            <select class="form-select" v-model="searchType">
              <option value="Recommended">Recommended</option>
              <option value="Packagist">Packagist</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modules-section">
        {{ packagistModules }}
        <div
          class="module"
          :class="{ 'module--selected': state.modules.includes(module.name) }"
          v-for="module in modules"
          @click="toggleModule(module.name)"
        >
          <div class="module__title">
            {{ module.name }}
            <span class="icon icon-checkmark" v-if="state.modules.includes(module.name)"></span>
          </div>
          <div class="module__description">{{ module.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStateStore } from '../stores/state'
import config from '../../../config/modules.json'
import { computed, onMounted, ref, watch } from 'vue'

const stateStore = useStateStore()
const { state } = storeToRefs(stateStore)

const searchType = ref('Recommended');
const packagistModules = ref([]);
const packagistTotal = ref(0);

const toggleModule = (moduleName: string) => {
  if (state.value.modules.includes(moduleName)) {
    state.value.modules = state.value.modules.filter((name) => name !== moduleName)
  } else {
    state.value.modules.push(moduleName)
  }
}

const getPackagistModules = () => {
  console.log('aaaa');
  fetch('https://packagist.org/search.json?type=silverstripe-vendormodule')
  .then(res => res.json())
  .then(data => {
    packagistTotal.value = data.total;
    packagistModules.value = data.results;
  });
}

watch(searchType, async(newState, oldState) => {
  
  // if (newState === 'Packagist' && !packagistModules.value) {
    // console.log(newState);
    // fetch('https://packagist.org/search.json?type=silverstripe-vendormodule')
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data);
    //   packagistTotal.value = data.total;
    //   packagistModules.value = data.results;
    // });
  // }
})

const modules = computed(() => {
  if (searchType.value === 'Recommended') return config.modules;
})
</script>
