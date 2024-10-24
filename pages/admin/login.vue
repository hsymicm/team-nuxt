<template>
  <main class="bg-indigo-50 min-h-screen grid place-items-center px-[14%] py-16">

    <Card class="m-1 overflow-hidden max-w-2xl w-full">
      <CardContent class="flex p-0">
        <section class="admin-bg bg-[90%_20%] flex flex-col justify-end px-8 py-12 w-1/2 bg-cover">
          <h1 @click="navigateTo('/')" class="cursor-pointer font-semibold text-5xl mb-1 text-white">team<span
              class="text-indigo-500">.</span></h1>
          <p class="font-light text-white">Welcome to the admin dashboard.</p>
        </section>
        <section class="w-1/2 px-8 py-12">
          <h2 class="text-xl font-bold text-primary-text mb-6">Login Panel</h2>
          <form class="flex flex-col gap-4" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel class="text-primary-text">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="johndoe@example.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel class="text-primary-text">Password</FormLabel>
                <FormControl>
                  <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="mt-4 -mb-2 flex flex-col gap-2">
              <Button type="submit">
                Login
              </Button>
              <Button variant="link" as-child>
                <NuxtLink to="/admin/register">Register</NuxtLink>
              </Button>
            </div>
          </form>
        </section>
      </CardContent>
    </Card>
  </main>
</template>

<script setup lang="ts">
import { MoveLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: 'Login Panel - Instant collaboration for remote teams',
  ogTitle: 'Login Panel - Instant collaboration for remote teams',
})

const formSchema = toTypedSchema(z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: "Let's go! Login successful.",
    description: 'Welcome to the admin dashboard.',
  })
})

</script>