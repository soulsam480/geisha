<script setup lang="ts">
import { useAppOpen } from '../store/modelCacheStore'
import AppAnchor from '~/components/AppAnchor.vue'
import AppPopup from '~/components/AppPopup.vue'

const isPopupOpen = useAppOpen()
</script>

<template>
  <div>
    <AppAnchor class="accent-indigo" />

    <AppPopup v-if="isPopupOpen" />
  </div>
</template>
