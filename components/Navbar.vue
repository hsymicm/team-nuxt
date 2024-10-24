<script setup lang="ts">
import { cn } from '@/lib/utils';

export interface NavbarProps {
  variant?: "light" | "dark"
}

const props = withDefaults(defineProps<NavbarProps>(), {
  variant: "light"
})

const isScrolled = ref(false)

onMounted(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      isScrolled.value = true
    } else {
      isScrolled.value = false
    }
  }

  if (window.scrollY > 50) {
    isScrolled.value = true
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

</script>

<template>
  <header :class='cn(
    variant === "light" ? "bg-white" : "bg-transparent",
    isScrolled && variant !== "light" && "bg-white",
    isScrolled ? "py-4 shadow-lg" : "py-10 shadow-none",
    "fixed px-[10%] flex justify-between w-full z-50 shadow-primary-text/5 transition-all"
  )'>
    <h2 @click="navigateTo('/')" :class='cn(
      "font-semibold mb-1 cursor-pointer transition-all",
      isScrolled ? "text-4xl" : "text-5xl",
      isScrolled || variant === "light" ? "text-primary-text" : "text-white"
    )'>team<span class="text-indigo-500">.</span></h2>
    <nav class="flex items-center gap-12">
      <ul class="inline-flex gap-12">
        <Navlink :variant="isScrolled || variant === 'light' ? 'light' : 'dark'" to="/">Home</Navlink>
        <Navlink :variant="isScrolled || variant === 'light' ? 'light' : 'dark'" to="/product">Product</Navlink>
        <Navlink :variant="isScrolled || variant === 'light' ? 'light' : 'dark'" to="/blog">Blog</Navlink>
        <Navlink :variant="isScrolled || variant === 'light' ? 'light' : 'dark'" to="/support">Support</Navlink>
        <Navlink :variant="isScrolled || variant === 'light' ? 'light' : 'dark'" to="/admin/login">Login</Navlink>
      </ul>
      <Button size="lg" class="w-36" as-child>
        <NuxtLink to="/">Get access</NuxtLink>
      </Button>
    </nav>
  </header>
</template>