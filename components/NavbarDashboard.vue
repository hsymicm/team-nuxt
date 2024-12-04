<script setup lang="ts">
import { cn } from "~/lib/utils"
import { Search } from 'lucide-vue-next'

</script>

<template>
  <header :class='cn(
    "sticky grid grid-cols-3 items-center w-full z-50 bg-white p-4 border-b-[1px]"
  )'>
    <h2 @click="navigateTo('/')" :class='cn(
      "font-semibold cursor-pointer transition-all text-primary-text text-2xl",
    )'>dashboard<span class="text-indigo-500">.</span></h2>
    <nav class="flex justify-center text-primary-text">
      <ul class="inline-flex items-center gap-12">
        <Navlink to="/admin">Overview</Navlink>
        <Navlink to="/admin/product">Product</Navlink>
        <Navlink to="/admin/blog">Blog</Navlink>
        <Navlink to="/admin/settings">Settings</Navlink>
      </ul>
    </nav>
    <section id="profile" class="flex justify-end gap-2">
      <section class="flex flex-col">
        <h4 class="text-sm font-medium text-primary-text text-right">Fadil Hisyam</h4>
        <p class="text-xs text-primary-text text-right">@hsymicm</p>
      </section>
      <Avatar>
        <AvatarImage src="../../assets/img/avatar-1.png" alt="profile picture" />
        <AvatarFallback>
          FH
        </AvatarFallback>
      </Avatar>
    </section>
  </header>
</template>