<template>
  <q-layout>
    <q-header class="transparent q-ma-md">
      <HeaderLayout />
    </q-header>
    <q-page-container>
      <div class="row q-ml-xl q-mr-xl" align="center">
        <FeatureComponent />
      </div>
      <q-separator color="teal" inset class="q-mb-lg" />
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

    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import FeatureComponent from '../components/FeatureComponent.vue';
import ProjectComponent from '../components/ProjectComponent.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import AddProject from './AddProject.vue';
const isDialogOpen = ref(false);
const openDialog = () => {
  isDialogOpen.value = true;
};
</script>
