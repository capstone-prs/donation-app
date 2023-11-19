<template>
  <div class="absolute-center" align="center">
    <q-img src="/ambag-logo.svg" width="150px" />
  </div>
  <div class="aboslute-center" align="center" style="margin-top: 250px">
    <GoogleSignIn />
  </div>
</template>

<script setup lang="ts">
import GoogleSignIn from '../components/buttons/GoogleSignIn.vue';
</script>
