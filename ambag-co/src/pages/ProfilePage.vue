<template>
  <q-layout>
    <q-header class="transparent q-ma-md">
      <q-btn
        flat
        icon="arrow_back_ios"
        text-color="teal"
        @click="navigateBack"
      />
    </q-header>
    <q-page-container> <div></div> </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateBack = () => {
  router.go(-1);
};
</script>
