<template>
  <div class="row">
    <div class="col q-mb-xl">
      <q-fab
        class="transparent"
        text-color="teal"
        icon="menu"
        direction="down"
        vertical-actions-align="left"
        @click="toggleFab"
        :class="dynamicMargin"
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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isFabOpen = ref(false);

const toggleFab = () => {
  isFabOpen.value = !isFabOpen.value;
};

const dynamicMargin = computed(() => {
  if (isFabOpen.value == true) {
    return 'push-below';
  } else {
    return '';
  }
});

const navigateTo = (page: string) => {
  router.push(`/${page}`);
};
</script>

<style>
.push-below {
  margin-bottom: 150px;
}
</style>
