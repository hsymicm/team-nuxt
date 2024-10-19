<script setup lang="ts">
import { cn } from '@/lib/utils';

import type { NavbarProps } from './Navbar.vue';
import type { NuxtLinkProps } from '#app';
import type { HTMLAttributes } from 'vue';

interface NavlinkProps extends NavbarProps, NuxtLinkProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<NavlinkProps>(), {
  variant: "light"
})

</script>

<template>
  <NuxtLink :to="props.to" active-class="underline" :class='cn(
    props.variant === "light" ? "text-primary-text" : "text-white",
    "underline-offset-4 hover:underline cursor-pointer transition-all",
    props.class
  )'>
    <slot />
  </NuxtLink>
</template>