<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface Testimonials {
  rating: Number
  review: String
  profileUrl: String
  name: String
  position: String
}

interface TestimonialProps {
  data?: Testimonials[]
}

const props = defineProps<TestimonialProps>();

</script>

<template>
  <Carousel
    v-slot="{ canScrollNext }"
    :opts="{ align: 'start', skipSnaps: true }"
    class="relative w-4/5"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(testimonial, index) in data"
        :key="index"
        class="xl:basis-1/3 2xl:basis-1/4"
      >
        <Card class="m-1">
          <CardContent class="px-6 py-10 cursor-grab select-none">
            <span class="flex gap-1 mb-6">
              <svg 
                v-for="(_, index) in testimonial.rating"
                :key="index"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 text-gold"
              >
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
            </span>
            <p class="text-primary-text">{{ testimonial.review }}</p>
            <section class="flex gap-3 items-center mt-8">
              <Avatar class="h-14 w-14 text-xl">
                <AvatarImage
                  :src="'../../assets/img/' + testimonial.profileUrl"
                  :alt="'@' + testimonial.name.split(' ').join('_')"
                />
                <AvatarFallback>
                  {{ testimonial.name.split(" ").map((word: string) => word[0]).join("") }}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 class="text-xl text-primary-text font-medium leading-tight mb-1">{{ testimonial.name }}</h3>
                <h4 class="text-sm text-indigo-500">
                  {{ testimonial.position }}
                </h4>
              </div>
            </section>
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="-left-16" />
    <CarouselNext class="-right-16" v-if="canScrollNext" />
  </Carousel>
</template>