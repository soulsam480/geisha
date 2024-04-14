<script setup lang="ts">
import 'uno.css'
import { useAppOpen } from '../store/modelCacheStore'
import AppAnchor from '~/components/AppAnchor.vue'
import AppPopup from '~/components/AppPopup.vue'

const isPopupOpen = useAppOpen()
</script>

<template>
  <div>
    <AppAnchor />

    <AppPopup v-if="isPopupOpen" />
  </div>
</template>
