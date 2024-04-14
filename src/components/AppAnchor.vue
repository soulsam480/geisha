<script setup lang='ts'>
import { useAppOpen } from '~/contentScripts/store/modelCacheStore'
import PhRocketLaunchFill from '~icons/ph/rocket-launch-fill'

const appOpen = useAppOpen()
</script>

<template>
  <div
    v-bind="$attrs"
    class="ml-2 h-6 w-6 flex cursor-pointer items-center justify-center rounded-full bg-emerald text-lg text-white font-semibold"
    @click="appOpen = !appOpen"
  >
    <PhRocketLaunchFill style="font-size: 16px;" />
  </div>
</template>
