<script setup lang='ts'>
import { computed } from 'vue'
import PlaylistItem from './PlaylistItem.vue'
import { modelCache } from '~/content/store/modelCacheStore'

const playlists = computed(() => Array.from(modelCache.albums.values()))
</script>

<template>
  <div v-bind="$attrs" class="fixed left-0 top-0 h-screen w-sm border-1 border-coolGray rounded-lg rounded-br-5 border-solid bg-dark p-4 text-white">
    o maa go sss
    <div class="grid grid-cols-2 gap-2">
      <PlaylistItem v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
    </div>
  </div>
</template>
