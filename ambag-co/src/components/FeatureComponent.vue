<template>
  <div
    class="row q-mb-lg q-pa-md"
    style="background-color: background: background: rgb(34,193,195);
 background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(135,175,30,1) 100%);
 border-radius: 10px; width: 100%"
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
