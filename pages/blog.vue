<script setup lang="ts">
useSeoMeta({
  title: 'Team Blog - Instant collaboration for remote teams',
  ogTitle: 'Team Blog - Instant collaboration for remote teams',
  description: 'All-in-one place for remote team to chat, collaborate, and track project progress.',
  ogDescription: 'All-in-one place for remote team to chat, collaborate, and track project progress.',
})

</script>

<template>
    <main class="min-h-screen">
        <h1>Blog Page</h1>
        <Button as-child>
            <NuxtLink to="/">Home</NuxtLink>
        </Button>
    </main>
</template>