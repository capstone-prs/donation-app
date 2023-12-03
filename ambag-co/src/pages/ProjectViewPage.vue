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
      <q-separator class="q-ma-md" color="grey" />
      <div class="text-h5 q-mb-lg" style="color: teal" align="center">
        DONATIONS
      </div>
      <div class="text-h7 q-ml-xl" style="color: grey" align="left">
        <q-icon name="paid" size="25px" color="teal" />
        {{ project?.goal }} ETH
      </div>
      <div class="text-h7 q-ml-xl" style="color: grey" align="LEFT">
        <q-icon name="handshake" size="25px" color="teal" />
        {{
          parseFloat(
            web3.utils.fromWei(project.amountCollected.toString(), 'ether')
          ).toFixed(2)
        }}
        ETH
      </div>
      <q-separator class="q-ml-xl q-mr-xl" />
      <div class="text-h6 q-ml-xl q-mb-lg" style="color: grey" align="LEFT">
        <q-icon name="wallet" size="25px" color="teal" />
        {{
          (
            project!.goal -
            parseFloat(
              web3.utils.fromWei(project.amountCollected.toString(), 'ether')
            )
          ).toFixed(2)
        }}
        ETH
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
        <DonorAvatar
          :address="entry.address"
          :donation="
            parseFloat(
              web3.utils.fromWei(entry.donation.toString(), 'ether')
            ).toFixed(2)
          "
        />
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
import { web3 } from '../utils/blockchain';

const $q = useQuasar();

const router = useRouter();
const projectIndex = router.currentRoute.value.params.param as string;
const project = ref<Project>({
  title: '',
  description: '',
  goal: 0,
  amountCollected: 0,
  deadline: 0,
  image: '',
});
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
