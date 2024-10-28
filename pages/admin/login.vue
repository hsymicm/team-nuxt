<template>
  <main class="bg-indigo-50 min-h-screen grid place-items-center px-[14%] py-16">
    <Card class="m-1 overflow-hidden max-w-2xl w-full">
      <CardContent class="flex p-0">
        <section class="admin-bg bg-[90%_20%] flex flex-col justify-end px-8 py-12 w-1/2 bg-cover">
          <h1 @click="navigateTo('/')" class="cursor-pointer font-semibold text-4xl mb-1 text-white">team<span
              class="text-indigo-500">.</span></h1>
          <p class="font-light text-sm text-white">Welcome to the admin dashboard.</p>
        </section>
        <section class="w-1/2 px-8 py-12">
          <h2 class="text-xl font-bold text-primary-text mb-6">Login Panel</h2>
          <form class="flex flex-col gap-6" @submit="onSubmit">
            <FormInputField 
              name="email" 
              type="email" 
              label="Email" 
              placeholder="johndoe@example.com" 
              is-required 
            />
            <FormInputField 
              name="password" 
              type="password" 
              label="Password" 
              is-required 
            />
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
import { Button } from '@/components/ui/button'
import { FormInputField } from '@/components/ui/form'
import { toast } from '@/components/ui/toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
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

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
})

const route = useRoute()

onMounted(() => {
  const queryEmail = route.query._email as string | undefined;

  if (queryEmail) {
    setFieldValue('email', queryEmail);
  }
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: "Let's go! Login successful.",
    description: 'Welcome to the admin dashboard.',
  })
})

</script>