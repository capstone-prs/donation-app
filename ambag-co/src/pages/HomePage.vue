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
import { useQuasar } from 'quasar';

const $q = useQuasar();

const projects = ref<Project[]>([]);

onBeforeMount(() => {
  $q.loading.show();
  getAllProjects().then((data) => {
    projects.value = data;
    $q.loading.hide();
  });
});
</script>
