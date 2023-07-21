<script lang="ts" setup>
import { useRoute, useSidebar } from '#imports'

const route = useRoute()

useSidebar('nc-left-sidebar', { hasSidebar: false })
</script>

<template>
  <NuxtLayout>
    <div
      class="min-h-[calc(100vh_-_var(--header-height))] bg-primary bg-opacity-5 flex flex-wrap justify-between xl:flex-nowrap gap-6 py-6 px-4 md:(px-12 pt-65px)"
    >
      <div class="w-full mx-auto">
        <NuxtPage :transition="false" />
      </div>
    </div>
  </NuxtLayout>
</template>
