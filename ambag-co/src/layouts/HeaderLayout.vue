<template>
  <div class="row">
    <div class="col">
      <q-fab
        class="transparent"
        text-color="teal"
        icon="menu"
        direction="down"
        vertical-actions-align="left"
      >
        <q-fab-action
          square
          label="HOME"
          text-color="grey-7"
          @click="navigateTo('home')"
        />
        <q-fab-action
          square
          label="DONORS"
          text-color="grey-7"
          @click="navigateTo('donor')"
        />
        <q-fab-action
          square
          label="PROJECTS"
          text-color="grey-7"
          @click="navigateTo('project')"
        />
      </q-fab>
    </div>
    <div class="row">
      <div class="col">
        <q-btn
          flat
          round
          icon="person"
          text-color="teal"
          style="background-color: rgb(244, 244, 244)"
          size="20px"
          @click="navigateTo('profile')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateTo = (page: string) => {
  router.push(`/${page}`);
};
</script>
