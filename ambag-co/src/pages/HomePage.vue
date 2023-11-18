<template>
  <q-layout>
    <q-header class="transparent q-ma-md">
      <HeaderLayout />
    </q-header>
    <q-page-container>
      <div class="row q-ml-xl q-mr-xl" align="center"></div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import { Project } from '../types/Users';
import { getAllProjects } from '../utils/blockchain';

const projects = ref<Project[]>([]);

onBeforeMount(() => {
  getAllProjects().then((data) => {
    projects.value = data;
  });
});
</script>
