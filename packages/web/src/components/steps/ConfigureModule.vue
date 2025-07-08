<template>
  <div class="form">
    <div class="form-group">
      <div class="form-control">
        <input class="form-input backpack-search__input" type="text" v-model="searchInput" />
      </div>
      <div class="form-control form-control--search-filter">
        <select class="form-select" v-model="searchType">
          <option value="Recommended">Recommended</option>
          <option value="Packagist">Packagist</option>
        </select>
      </div>
    </div>

    <div class="modules-section">
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
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStateStore } from '../../stores/state'
import config from '../../../../../packs/stitch-pack/config/modules.json';


import { computed, onMounted, ref, watch } from 'vue'
const stateStore = useStateStore()
const { state } = storeToRefs(stateStore)
const searchType = defineModel({
  default: 'Recommended'
})
const searchInput = defineModel('')
const packagistModules = ref()
const packagistTotal = ref(0)
const toggleModule = (moduleName: string) => {
  if (state.value.modules.includes(moduleName)) {
    state.value.modules = state.value.modules.filter((name) => name !== moduleName)
  } else {
    state.value.modules.push(moduleName)
  }
}
const getPackagistModules = () => {
  console.log('aaaa')
  const params = new URLSearchParams()
  params.append('q', searchInput.value)
  params.append('type', 'silverstripe-vendormodule')
  fetch(`https://packagist.org/search.json?${params.toString()}`)
    .then((res) => res.json())
    .then((data) => {
      packagistTotal.value = data.total
      packagistModules.value = data.results
    })
}
watch(searchType, async (newState, oldState) => {
  console.log(packagistModules.value)
  if (newState === 'Packagist' && !packagistModules.value) {
    getPackagistModules()
  }
})

const modules = computed(() => {
  if (searchType.value === 'Recommended') return config.modules
  return packagistModules.value
})
</script>
