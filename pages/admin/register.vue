<template>
  <main class="bg-indigo-50 min-h-screen w-full grid place-items-center px-[14%] py-8">
    <Card class="m-1 overflow-hidden max-w-4xl w-full">
      <CardContent class="flex p-0">
        <section class="admin-bg bg-[90%_20%] flex flex-col justify-end px-8 py-12 w-1/2 bg-cover">
          <h1 @click="navigateTo('/')" class="w-fit font-semibold text-5xl mb-1 text-white cursor-pointer">team<span
              class="text-indigo-500">.</span></h1>
          <p class="font-light text-white">
            Welcome to the admin dashboard.
          </p>
        </section>
        <section class="w-1/2 px-8 py-12">
          <h2 class="text-xl font-bold text-primary-text mb-6">
            Register Account
          </h2>
          <form class="flex flex-col gap-6" @submit="onSubmit">
            <FormInputField name="name" label="Full Name" description="This is your public display name."
              placeholder="John Doe" is-required />
            <FormInputField name="username" label="Username" placeholder="johndoe01" is-required />
            <FormInputField name="email" type="email" label="Email" placeholder="johndoe@example.com" is-required />
            <FormInputField name="password" type="password" label="Password"
              description="Passwords must contain at least six characters." is-required />
            <FormInputField name="confirmPassword" type="password" label="Confirm Password" is-required />
            <div class="mt-4 -mb-2 flex flex-col gap-2">
              <Button :disabled="isLoading" type="submit">
                <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
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
import { Loader2 } from 'lucide-vue-next'
import { toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { FormInputField } from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: 'Register Account - Instant collaboration for remote teams',
  ogTitle: 'Register Account - Instant collaboration for remote teams',
})

const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  username: z.string().min(3, "Username must be at least 3 characters long.")
    .max(50, "Username can't be longer than 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Please enter a valid password"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords do not match.",
}))

const { handleSubmit, setFieldError } = useForm({
  validationSchema: formSchema,
})

const formFieldKeys = ["name", "username", "email", "password", "confirmPassword"] as const;
type FormFieldKey = typeof formFieldKeys[number]

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  const { email, username, name, password } = values

  const res = await $fetch('/api/register', {
    method: 'post',
    body: {
      email,
      username,
      name,
      password
    }
  })

  if (res.status === "success") {
    navigateTo(`/admin/login?_email=${res.data.email}`)

    toast({
      title: "Registration Successful!",
      description: `Hello ${res.data.name}. Your account has been created, you can login now.`,
      variant: "success",
    })
  }

  if (res.status === "error" && res.statusCode == 400 && res.details) {
    Object.entries(res.details).forEach(([key, value]) => {
      if (formFieldKeys.includes(key as FormFieldKey)) {
        setFieldError(key as FormFieldKey, value as string);
      }
    })
  }

  if (res.status === "error" && res.statusCode == 500) {
    toast({
      title: "Registration Failed!",
      description: 'Something happened, please try again later.',
      variant: "destructive",
    })
  }

  isLoading.value = false
})

</script>