<script setup lang="ts">
import { Field, type RuleExpression } from 'vee-validate'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  enableAnimation?: boolean;
  rules?: RuleExpression<unknown>;
}

withDefaults(defineProps<FormFieldProps>(), {
  type: "text",
  isRequired: false,
  enableAnimation: false,
})

</script>

<template>
  <Field v-slot="{ componentField }" :name="name" :rules="rules">
    <FormItem v-auto-animate="{ duration: 150 }">
      <FormLabel class="text-primary-text">
        {{ label }}
      </FormLabel>
      <FormControl>
        <Input class="text-primary-text" :required="isRequired" :type="type" :placeholder="placeholder" v-bind="componentField" />
      </FormControl>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </Field>
</template>