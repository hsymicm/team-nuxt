<script setup lang="ts">
import { formatDate } from '@/lib/utils';

useSeoMeta({
  title: 'Team Blog - Instant collaboration for remote teams',
  ogTitle: 'Team Blog - Instant collaboration for remote teams',
  description: 'All-in-one place for remote team to chat, collaborate, and track project progress.',
  ogDescription: 'All-in-one place for remote team to chat, collaborate, and track project progress.',
})

const route = useRoute()

const currentPage = ref(Number(route.query.page) || 1)
  
const { data, status, refresh } = await useAsyncData(
  "post-" + currentPage.value.toString(),
  () => $fetch(
    "/api/post",
    { query: { page: currentPage.value } }
  )
)

const posts = computed(() => data.value?.data || {});
const meta = computed(() => data.value?.meta || {});

const updatePage = (newPage: number) => {
  if (currentPage.value === newPage) return
  currentPage.value = newPage
  refresh()
  navigateTo({ query: { ...route.query, page: currentPage.value }, replace: true })
  window.scrollTo(0, 0)
};

</script>

<template>
  <main class="px-[10%] min-h-screen">
    <section class="pt-48 pb-20">
      <h1 class="text-5xl font-bold text-primary-text mb-6">Blog</h1>
      <h3 class="text-primary-text">Open-source threaded team chat that helps teams stay productive and focused.</h3>
    </section>
    <div v-if="status === 'pending'" class="grid grid-cols-3 gap-x-4 gap-y-8">
      <Card v-for="(_, index) in 3" :key="index" class="m-1 border-gray-200 overflow-hidden">
        <CardContent class="flex flex-col p-0">
          <AspectRatio :ratio="16 / 10">
            <div class="bg-gray-200 w-full h-full"></div>
          </AspectRatio>
          <div class="bg-gray-100 p-4">
            <div class="w-full h-6 bg-gray-200 rounded mb-2"></div>
            <div class="w-3/4 h-6 bg-gray-200 rounded mb-6"></div>
            <div class="w-full h-4 bg-gray-200 rounded mb-1"></div>
            <div class="w-full h-4 bg-gray-200 rounded mb-1"></div>
            <div class="w-1/4 h-4 bg-gray-200 rounded mb-8"></div>
            <div class="flex gap-3 items-center">
              <div class="w-12 aspect-square bg-gray-200 rounded-full"></div>
              <div class="w-full h-5 bg-gray-200 rounded"></div>

            </div>
          </div>
        </CardContent>
      </Card> 
    </div>  
    <div v-if="status === 'success' && posts.length > 0" class="grid grid-cols-3 gap-x-4 gap-y-8">
      <Card v-for="post in posts" :key="post.id" class="m-1 overflow-hidden cursor-pointer h-fit">
        <CardContent class="flex flex-col justify-between p-0">
          <section>
            <AspectRatio :ratio="16 / 10">
              <img class="object-cover w-full h-full" src="../../uploads/74d274e20e85a97e6c4b923e0b9fa71a.jpg"
                alt="image post">
            </AspectRatio>
            <div class="p-4">
              <h2 class="text-xl font-medium text-indigo-500 mt-2 mb-3">
                {{ post.title }}
              </h2>
              <p class="text-sm text-primary-text">
                {{ post.description }}
              </p>
            </div>
          </section>
          <section class="p-4 flex gap-2 items-center mb-2">
            <Avatar>
              <AvatarImage src="../../assets/img/avatar-1.png" :alt="post.author + 'profile picture'" />
              <AvatarFallback>
                {{ post.author.split(" ").map((word: string) => word[0]).join("") }}
              </AvatarFallback>
            </Avatar>
            <h6 class="text-sm text-indigo-500">{{ post.author }}</h6>
            <div class="ml-[1px] h-6 w-[1px] bg-indigo-500"></div>
            <p class="text-sm text-indigo-500">{{ formatDate(post.postedAt) }}</p>
          </section>
        </CardContent>
      </Card>
    </div>
    <div class="flex justify-center py-16">
      <Pagination v-slot="{ page }" v-on:update:page="updatePage" :page="currentPage" :items-per-page="meta.limit"
        :total="meta.totalPosts" :sibling-count="1" :default-page="1" show-edges>
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationPrev />
          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>
          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
  </main>
</template>