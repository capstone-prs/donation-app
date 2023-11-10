<template>
  <q-layout>
    <q-header class="transparent q-ma-md">
      <HeaderLayout />
    </q-header>
    <q-page-container>
      {{ tokenName }} : {{ tokenTotalSupply }}

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
// import { ref} from 'vue';
import FeatureComponent from '../components/FeatureComponent.vue';
import ProjectComponent from '../components/ProjectComponent.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import AddProject from './AddProject.vue';
const isDialogOpen = ref(false);
const openDialog = () => {
  isDialogOpen.value = true;
};

import Web3 from 'web3';
import abi from './USDT_contract_ABI.json';
import { onBeforeMount, ref } from 'vue';

const USDT_address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const web3 = new Web3(
  'https://mainnet.infura.io/v3/' + import.meta.env.VITE_INFURA_ID // store privatly
);

// var address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // sample account
// web3.eth.getBalance(address).then((wei) => {
//   console.log(web3.utils.fromWei(wei, 'ether'));
// });

const contract = new web3.eth.Contract(JSON.parse(abi.result), USDT_address);

const tokenName = ref();
const tokenTotalSupply = ref([]);

onBeforeMount(() => {
  contract.methods
    .name()
    .call()
    .then((e) => (tokenName.value = e ?? []))
    .then(() => {
      contract.methods
        .totalSupply()
        .call()
        .then((e) => {
          tokenTotalSupply.value = e ?? [];
        });
    });
});
</script>
