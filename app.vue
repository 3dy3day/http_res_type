// ~/pages/app.vue
<template>
  <div>
    <button @click="fetchUserData">Load User Data</button>
    <p v-if="state === 'loading'">Loading...</p>
    <div v-if="state === 'success' && user">
      <p>ID: {{ user.id }}</p>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>

    <div v-if="state === 'error'">
      <p>Error occurred in {{ error?.functionName || 'unknown function' }}: {{ error?.errorMessage || 'Unknown error' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUser } from '~/composables/getUser';

const userId = ref(1);
const { user, error, state, fetchUser } = getUser();

const fetchUserData = () => {
  fetchUser(userId.value);
};

onMounted(fetchUserData);
</script>
