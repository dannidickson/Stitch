<template>
  <form class="site-setup-form" @submit.prevent="submitForm">
    <div>
      <label for="siteName">Site Name</label>
      <input id="siteName" v-model="form.siteName" type="text" required />
    </div>
    <div>
      <label for="version">Version</label>
      <select id="version" v-model="form.version" required>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
    <div>
      <label for="adminEmail">Admin Email</label>
      <input id="adminEmail" v-model="form.adminEmail" type="email" required />
    </div>
    <div>
      <label for="language">Default Language</label>
      <select id="language" v-model="form.language">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>
    <div>
      <label for="timezone">Timezone</label>
      <select id="timezone" v-model="form.timezone">
        <option value="UTC">UTC</option>
        <option value="America/New_York">America/New_York</option>
        <option value="Europe/London">Europe/London</option>
        <option value="Asia/Tokyo">Asia/Tokyo</option>
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  siteName: '',
  version: '5',
  adminEmail: '',
  language: 'en',
  timezone: 'UTC',
});

function submitForm() {
  // For now, just log the form data
  console.log('Site Setup Data:', { ...form });
  alert('Site setup submitted!');
}
</script>

<style scoped>
.site-setup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}
.site-setup-form label {
  font-weight: bold;
}
.site-setup-form input,
.site-setup-form select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}
</style>
