<template>
  <div
    class="row q-mb-lg q-pa-md"
    style="background-color: teal; border-radius: 10px; width: 100%"
  >
    <div class="col">
      <div class="text-h5" style="color: white">TOP ALL TIME DONOR:</div>
      <DonorAvatar />
    </div>
  </div>
</template>
<script setup lang="ts">
import DonorAvatar from './DonorAvatar.vue';
</script>
