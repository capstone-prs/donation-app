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
        PROJECTS
      </div>
      <div>
        <template v-for="project in projects" :key="project.project_name">
          <ProjectComponent
            :project-title="project.project_name"
            :target-recipient="project.project_org"
            :goal-funding="project.project_goal"
            :background-image="project.project_image"
          />
        </template>

        <q-btn
        flat
        round
        icon="add"
        text-color="teal"
        style="background-color: #defade; position: fixed; top: 85%; left: 75%"
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
import { getProjects } from 'src/utils/firebase';
import { Project } from '../types/Users';
import AddProject from './AddProject.vue';

const projects = ref<Project[]>([]);

onBeforeMount(() => {
  getProjects().then((data) => {
    projects.value = data;
  });
});


const isDialogOpen = ref(false);

console.log(isDialogOpen.value)
const openDialog = () => {
  isDialogOpen.value = true;
};


</script>
