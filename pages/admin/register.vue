<template>
  <main class="bg-indigo-50 min-h-screen grid place-items-center px-[14%] py-16"> 
    <Card class="m-1 overflow-hidden max-w-4xl w-full">
      <CardContent class="flex p-0">
        <section class="admin-bg bg-[90%_20%] flex flex-col justify-end px-8 py-12 w-1/2 bg-cover">
          <h1 @click="navigateTo('/')" class="w-fit font-semibold text-5xl mb-1 text-white cursor-pointer">team<span class="text-indigo-500">.</span></h1>
          <p class="font-light text-white">
            Welcome to the admin dashboard.
          </p>
        </section>
        <section class="w-1/2 px-8 py-12">
          <h2 class="text-xl font-bold text-primary-text mb-6">
            Register Account
          </h2>
          <form class="flex flex-col gap-4" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel class="text-primary-text">Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" v-bind="componentField" />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel class="text-primary-text">Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="johndoe01" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
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
                <FormDescription>Passwords must contain at least six characters</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="confirmPassword">
              <FormItem>
                <FormLabel class="text-primary-text">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" required v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="mt-4 -mb-2 flex flex-col gap-2">
              <Button type="submit">
                Register
              </Button>
              <Button variant="link" as-child>
                <NuxtLink to="/admin/login">Login</NuxtLink>
              </Button>
            </div>
          </form>
        </section>
      </CardContent>
    </Card>
  </main>
</template>

<script setup lang="ts">
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
  title: 'Register Account - Instant collaboration for remote teams',
  ogTitle: 'Register Account - Instant collaboration for remote teams',
})

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  username: z.string().min(3, "Username must be at least 3 characters long.")
    .max(50, "Username can't be longer than 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Please enter a valid password"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'], // specify which field the error should apply to
  message: "Passwords do not match.",
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