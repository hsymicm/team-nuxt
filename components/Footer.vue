<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next"

</script>

<template>
  <footer class="bg-[#232340] px-[10%] pt-16 pb-12 mt-16">
    <div class="grid lg:grid-cols-5 gap-8">
      <section>
        <h2 @click="navigateTo('/')" class="cursor-pointer text-5xl text-white font-semibold mb-4">team<span class="text-indigo-500">.</span></h2>
        <h3 class="text-sm text-white font-light">Collaboration platform for modern team</h3>
      </section>
      <section>
        <h4 class="text-2xl text-indigo-500 mb-4">Company</h4>
        <ul class="flex flex-col gap-4">
          <NuxtLink to="/product" class="text-sm text-white font-light w-fit">Product</NuxtLink>
          <NuxtLink to="/blog" class="text-sm text-white font-light w-fit">Blog</NuxtLink>
          <NuxtLink to="/support" class="text-sm text-white font-light w-fit">Support</NuxtLink>
        </ul>
      </section>
      <section>
        <h4 class="text-2xl text-indigo-500 mb-4">Features</h4>
        <ul class="flex flex-col gap-4">
          <NuxtLink class="text-sm text-white font-light w-fit">Screen Sharing</NuxtLink>
          <NuxtLink class="text-sm text-white font-light w-fit">iOS & Android Apps</NuxtLink>
          <NuxtLink class="text-sm text-white font-light w-fit">File Sharing</NuxtLink>
          <NuxtLink class="text-sm text-white font-light w-fit">User Management</NuxtLink>
        </ul>
      </section>
      <section>
        <h4 class="text-2xl text-indigo-500 mb-4">Contact Us</h4>
        <ul class="flex flex-col gap-4">
          <NuxtLink class="text-sm text-white font-light w-fit">info@teamapp.com</NuxtLink>
          <NuxtLink class="text-sm text-white font-light w-fit">1-800-200-300</NuxtLink>
          <NuxtLink class="text-sm text-white font-light w-fit">1010 Sunset Blv. Palo Alto, California</NuxtLink>
        </ul>
      </section>
      <section>
        <h4 class="text-2xl text-indigo-500 mb-4">Contact Us</h4>
        <p class="text-sm text-white font-light mb-4">Subscribe to our newseller</p>
        <div class="relative items-center w-full max-w-xs">
          <Input type="email" placeholder="Email" class="text-white border-0 bg-white/20 text-sm font-light placeholder:text-white" />
          <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
            <ArrowRight class="size-[18px] text-white" />
          </span>
        </div>
      </section>
    </div>
    <p class="text-sm text-white font-light mt-24">&copy; Copyright Team Inc.</p>
  </footer>
</template>