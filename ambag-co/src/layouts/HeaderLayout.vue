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
          label="ABOUT"
          text-color="grey-7"
          @click="navigateTo('about')"
        />
      </q-fab>
    </div>
    <div class="row">
      <div class="col">
        <q-avatar
          flat
          round
          text-color="teal"
          style="background-color: rgb(244, 244, 244)"
          size="55px"
          @click="navigateTo('profile')"
        >
          <img :src="currentUser?.photoURL || ''" alt="" />
        </q-avatar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, User } from 'firebase/auth';
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import app from 'src/boot/firebase';

const currentUser = ref<User | null>(null);

onBeforeMount(() =>
  getAuth(app)
    .authStateReady()
    .then(() => {
      currentUser.value = getAuth(app).currentUser;
    })
);

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
  margin-bottom: 100px;
}
</style>
