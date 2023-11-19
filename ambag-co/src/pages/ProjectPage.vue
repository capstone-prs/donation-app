<template>
  <q-layout>
    <q-header class="transparent q-ma-md">
      <HeaderLayout />
    </q-header>
    <q-page-container>
      <div
        class="text-h4 q-mb-lg q-ml-xl q-mr-xl"
        style="color: teal"
        align="center"
      >
        HOME
      </div>
      <div>
        <template v-for="(project, index) in projects" :key="index">
          <ProjectComponent
            :project-index="index"
            :project-title="project.title"
            :deadline="project.deadline"
            :goal-funding="project.goal"
            :background-image="project.image"
            :description="project.description"
          />
        </template>

        <q-btn
          glossy
          round
          icon="add"
          text-color="white"
          style="background-color: teal; position: fixed; top: 85%; left: 75%"
          size="20px"
          @click="openDialog"
        />
        <AddProject v-model="isDialogOpen" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import ProjectComponent from '../components/ProjectComponent.vue';
import { Project } from '../types/Users';
import AddProject from './AddProject.vue';
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

const isDialogOpen = ref(false);

console.log(isDialogOpen.value);
const openDialog = () => {
  isDialogOpen.value = true;
};
</script>
