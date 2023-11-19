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
        {{ project?.title }}
      </div>
      <div class="text-h6" style="color: grey" align="center">
        <q-icon name="paid" size="25px" color="teal" />
        {{ project?.goal }} ETH
      </div>
      <div align="center">
        <q-img
          :src="project?.image"
          class="q-ma-md"
          style="height: 200px; max-width: 300px"
        />
      </div>
      <div
        class="text-h8 q-mb-lg q-ml-xl q-mr-xl"
        style="color: black"
        align="left"
      >
        {{ project?.description }}
      </div>
      <q-separator class="q-ma-md" />
      <div
        class="text-h5 q-mb-lg q-ml-xl q-mr-xl"
        style="color: teal"
        align="center"
      >
        DONATIONS
      </div>

      <div
        v-if="donationInfo.length == 0"
        class="text-h7 q-mb-lg q-ml-xl q-mr-xl text-italic"
        style="color: grey"
        align="center"
      >
        No one has donated yet
      </div>
      <template v-for="(entry, index) in donationInfo" :key="index">
        <DonorAvatar :address="entry.address" :donation="entry.donation" />
      </template>
      <q-btn
        glossy
        round
        icon="wallet"
        text-color="white"
        style="background-color: teal; position: fixed; top: 85%; left: 75%"
        size="20px"
        @click="openDialog"
      />
      <div>
        <donate-dialog
          :index="parseInt(projectIndex)"
          :deadline="project?.deadline"
          :target-fund="project?.goal"
          v-model="isDialogOpen"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import { getProject, getProjectDonors } from '../utils/blockchain';
import { onBeforeMount, ref } from 'vue';
import { Donor, Project } from '../types/Users';
import DonorAvatar from '../components/DonorAvatar.vue';
import DonateDialog from '../components/DonateDialog.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const router = useRouter();
const projectIndex = router.currentRoute.value.params.param as string;
const project = ref<Project>();
const donationInfo = ref<Donor[]>([]);
const isDialogOpen = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
};

onBeforeMount(() => {
  $q.loading.show();
  getProject(parseInt(projectIndex)).then((data) => {
    project.value = data;
  });

  getProjectDonors(parseInt(projectIndex)).then(
    (data: [string[], string[]]) => {
      const addresses = data[0];
      const donations = data[1];
      donationInfo.value = addresses.map((address, index) => ({
        address,
        donation: Number(donations[index]),
      }));
      $q.loading.hide();
    }
  );
});
</script>
