<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <div>
    <Navbar :variant='route.name === "index" ? "dark" : "light"' />
    <slot />
    <Footer />
  </div>
</template>