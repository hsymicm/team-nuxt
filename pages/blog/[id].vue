<template>
    <main class="min-h-screen">
        <h1>Post Page {{ $route.params.id }}</h1>
        <Button as-child>
            <NuxtLink to="/">Home</NuxtLink>
        </Button>
    </main>
</template>