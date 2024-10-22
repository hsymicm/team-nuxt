<script setup lang="ts">
import { MoveRight, ArrowRight } from 'lucide-vue-next'

useSeoMeta({
  title: 'Instant collaboration for remote teams',
  ogTitle: 'Instant collaboration for remote teams',
  description: 'All-in-one place for remote team to chat, collaborate, and track project progress.',
  ogDescription: 'All-in-one place for remote team to chat, collaborate, and track project progress.',
})

const { data, status, error } = useFetch("/api/testimonial")
const testimonials = data.value?.data

</script>

<template>
  <main class="min-h-screen">
    <section
      class="custom-bg bg-[#232340] bg-cover bg-[center_20%] px-[10%] py-36 h-[95vh] flex flex-col justify-center">
      <h1 class="max-w-xl text-balance text-5xl text-white leading-tight font-bold mb-5">Instant collaboration for
        remote teams</h1>
      <h3 class="max-w-xl text-balance text-lg font-light text-white mb-14">All-in-one place for remote team to chat,
        collaborate, and track project progress.</h3>
      <div class="flex gap-4 mb-4">
        <div class="relative items-center w-full max-w-xs">
          <Input type="email" placeholder="janedoe@example.com" />
          <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
            <ArrowRight class="size-5 text-indigo-500" />
          </span>
        </div>
        <Button class="w-48">Get early access</Button>
      </div>
    </section>
    <section class="flex flex-row-reverse items-center gap-12 py-20">
      <div class="basis-1/2">
        <img src="../assets/img/home-content-1.png" />
      </div>
      <div class="pl-[10%] basis-1/2">
        <h2 class="text-5xl font-bold leading-snug text-primary-text mb-6">Chats for your distributed teams</h2>
        <p class="text-primary-text">Team combines the immediacy of real-time chat with an email threading model. With Team, you can catch up on important conversations while ignoring irrelevant ones.</p>
        <Button class="mt-12 p-0 relative" variant="link" as-child>
          <NuxtLink to="/">Learn more <MoveRight class="ml-2 size-5 text-indigo-500" /></NuxtLink>
        </Button>
      </div>
    </section>
    <section class="px-[10%] flex items-center gap-[10%] py-20">
      <div class="relative basis-1/2">
        <img class="absolute top-0 right-0 p-[4%] w-1/2" src="../assets/img/home-ilst-1.png" />
        <img class="aspect-square max-w-xl w-full" src="../assets/img/home-content-2.jpg" />
      </div>
      <div class="basis-1/2">
        <h2 class="text-5xl font-bold leading-snug text-primary-text mb-6">Chats for your distributed teams</h2>
        <p class="text-primary-text">Team combines the immediacy of real-time chat with an email threading model. With Team, you can catch up on important conversations while ignoring irrelevant ones.</p>
        <Button class="mt-12 p-0 relative" variant="link" as-child>
          <NuxtLink to="/">Learn more <MoveRight class="ml-2 size-5 text-indigo-500" /></NuxtLink>
        </Button>
      </div>
    </section>
    <section class="px-[10%] flex flex-row-reverse items-center gap-[10%] py-20">
      <div class="relative basis-1/2">
        <div class="absolute bottom-0 right-0 p-[4%] w-1/2">
          <img class="mb-[4%]" src="../assets/img/home-ilst-2.png" />
          <img class="" src="../assets/img/home-ilst-3.png" />
        </div>
        <img class="aspect-square max-w-xl w-full" src="../assets/img/home-content-3.jpg" />
      </div>
      <div class="basis-1/2">
        <h2 class="text-5xl font-bold leading-snug text-primary-text mb-6">Choose how you want to work</h2>
        <p class="text-primary-text">In Team, you’ve got all the flexibility to work when, where and how it’s best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.</p>
        <Button class="mt-12 p-0 relative" variant="link" as-child>
          <NuxtLink to="/">Learn more <MoveRight class="ml-2 size-5 text-indigo-500" /></NuxtLink>
        </Button>
      </div>
    </section>
    <section class="px-[10%] flex items-center gap-[10%] py-20">
      <div class="relative basis-1/2 aspect-square max-w-xl w-full">
        <div class="absolute bottom-0 left-0 p-[4%] w-1/2">
          <img class="mb-[4%]" src="../assets/img/home-ilst-4.png" />
          <img class="" src="../assets/img/home-ilst-5.png" />
        </div>
        <img class="h-full w-full" src="../assets/img/home-content-4.jpg" />
      </div>
      <div class="basis-1/2">
        <h2 class="text-5xl font-bold leading-snug text-primary-text mb-6">Move faster with your Team tools</h2>
        <p class="text-primary-text">With your other work apps connected to Team, you can work faster by switching tabs less. And with powerful tools like Workflow Builder, you can automate away routine tasks.</p>
        <Button class="mt-12 p-0 relative" variant="link" as-child>
          <NuxtLink to="/">Learn more <MoveRight class="ml-2 size-5 text-indigo-500" /></NuxtLink>
        </Button>
      </div>
    </section>
    <section class="flex flex-col items-center px-[10%] py-32">
      <h2 class="text-5xl font-bold text-primary-text mb-24">What people say about Team</h2>
      <Testimonial v-if="status === 'success'" :data="testimonials" />
    </section>
  </main>
</template>