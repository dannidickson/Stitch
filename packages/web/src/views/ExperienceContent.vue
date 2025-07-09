<template>
  <div class="experience-content">
    <h1>Enhance the Experience</h1>
    <button class="button button--primary" @click="addPage">Add Page</button>

    <div class="card-setup-group">
      <div class="card" v-for="page in filteredPages" :key="page.id">
        <div class="card__title">{{ page.title }}</div>
        <p>{{ page.description }}</p>
        <button class="button button--secondary" @click="selectPage(page)">
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStateStore } from '../stores/state'
import { storeToRefs } from 'pinia'

const stateStore = useStateStore()
const { state } = storeToRefs(stateStore)

// Example pages data - you can replace this with your actual data source
const pages = [
  {
    id: 1,
    title: 'Home Page',
    description: 'Main landing page template with hero section and featured content',
    type: 'landing'
  },
  {
    id: 2,
    title: 'About Page',
    description: 'Company information and team member profiles',
    type: 'content'
  },
  {
    id: 3,
    title: 'Contact Page',
    description: 'Contact form and location information',
    type: 'utility'
  }
]

const filteredPages = computed(() => {
  return pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(state.value.pageSearch?.toLowerCase() || '') ||
      page.description.toLowerCase().includes(state.value.pageSearch?.toLowerCase() || '')
    const matchesType = !state.value.selectedPageType || page.type === state.value.selectedPageType
    return matchesSearch && matchesType
  })
})

const addPage = () => {
  // Implement page addition logic
  console.log('Adding new page')
}

const selectPage = (page: any) => {
  // Implement page selection logic
  console.log('Selected page:', page)
}
</script>

<style scoped>
.experience-content {
  padding: 1rem;
}

.button--primary {
  margin-bottom: 1.5rem;
}

.card-setup-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.card {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.card__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.button--secondary {
  margin-top: 1rem;
  width: 100%;
}
</style> 