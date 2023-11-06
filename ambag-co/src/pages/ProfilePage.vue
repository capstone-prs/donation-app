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
        <q-avatar
          size="100px"
          font-size="52px"
        > <img :src="userProfilePic || ''" alt=""></q-avatar>
      </div>
      <div class="q-pt-md centered-content">
        <span style="color: grey">{{ userEmail }}</span>
        <h6 style="color: grey">Projects Started</h6>
        <h5 style="color: teal">90</h5>
        <h6 style="color: grey">Donations Made</h6>
        <h5 style="color: teal">90 ETH</h5>
      </div>
      <div class="q-pt-md centered-content">
        <q-btn rounded color="teal-5" size="lg" @click="handleLogOut">LOGOUT</q-btn>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { logout} from 'src/utils/firebase';
import { getAuth } from 'firebase/auth';


const userEmail = getAuth().currentUser?.email
const userProfilePic = getAuth().currentUser?.photoURL
const router = useRouter();
const navigateBack = () => {
  router.go(-1);
};

const handleLogOut = () => {
  logout()
  .then(()=> {
    console.log('working!')
    router.push('/#')
  })
  .catch(()=>{
    console.error('logout fail');
  })
}

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
