<template>
  <q-layout>
    <q-header class="transparent q-ma-md">
      <q-btn
        flat
        icon="arrow_back_ios"
        text-color="teal"
        @click="navigateBack"
      />
    </q-header>
    <q-page-container class="q-pt-xl centered-container">
      <div class="centered-content">
        <q-avatar size="100px" font-size="52px">
          <img :src="currentUser?.photoURL || ''" alt=""
        /></q-avatar>
      </div>
      <div class="q-pt-md centered-content">
        <span style="color: grey">{{ currentUser?.email }}</span>
      </div>
      <div class="q-pb-sm q-mt-xl centered-content">
        <q-btn
          rounded
          outline
          color="teal-5"
          size="md"
          @click="connectToWallet"
        >
          <q-icon name="img:/metamask-logo.png" />
          CONNECT TO WALLET
        </q-btn>
      </div>
    </q-page-container>
    <q-footer class="transparent">
      <div class="q-ma-xl centered-content">
        <q-btn rounded glossy color="teal-5" size="lg" @click="handleLogOut"
          >LOGOUT</q-btn
        >
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { logout } from 'src/utils/firebase';
import { User, getAuth } from 'firebase/auth';
import { onBeforeMount, ref } from 'vue';

import app from 'src/boot/firebase';
import detectEthereumProvider from '@metamask/detect-provider';
import { useQuasar } from 'quasar';

const currentUser = ref<User | null>(null);
const $q = useQuasar();

const router = useRouter();
const navigateBack = () => {
  router.go(-1);
};

const connectToWallet = async () => {
  const provider = await detectEthereumProvider();

  if (provider?.isMetaMask) {
    console.log('Metamask is installed');
    const accounts = await (window as any).ethereum
      .request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    console.log(account);
  } else {
    console.log('Please install MetaMask!');
    $q.notify({
      type: 'negative',
      message: 'Please install MetaMask as browser extension',
    });
  }
};

onBeforeMount(() =>
  getAuth(app)
    .authStateReady()
    .then(() => {
      currentUser.value = getAuth(app).currentUser;
    })
);

const handleLogOut = () => {
  logout()
    .then(() => {
      console.log('working!');
      router.push('/#');
    })
    .catch(() => {
      console.error('logout fail');
    });
};
</script>
<style>
.centered-container {
  display: relative;
  justify-content: center;
  align-items: center;
  padding-top: 100%;
}

.centered-content {
  text-align: center; /* Center the content horizontally */
}
</style>
