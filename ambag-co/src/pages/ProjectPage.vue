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
        <ProjectComponent
          project-title="Aspiring Filmmakers Funding"
          target-recipient="JELOTODA"
          :goal-funding="2000"
          background-image="/sample.jpg"
        />

        <ProjectComponent
          project-title="Agriculture Funding"
          target-recipient="FAP"
          :goal-funding="5000"
          background-image="/sample2.jpg"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import HeaderLayout from '../layouts/HeaderLayout.vue';
import ProjectComponent from '../components/ProjectComponent.vue';
</script>
