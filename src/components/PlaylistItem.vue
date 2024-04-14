<script setup lang='ts'>
import type { Album } from '~/store/models/album'

defineProps<{
  playlist: Album
}>()
</script>

<template>
  <div class="bg-gray-5 p-4">
    <img v-if="playlist.thumbnails[0]?.url" :src="playlist.thumbnails[0].url" height="100px" width="100px" class="aspect-square">
    <div class="text-lg font-semibold">
      {{ playlist.name }}
    </div>
  </div>
</template>
