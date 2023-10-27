<template>
  <div>
    <googleSignIn />
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router';
import googleSignIn from './buttons/GoogleSignIn.vue';
// import GoogleLogin from 'vue-google-login';

// const router = useRouter();
</script>
<style>
.google-login-button {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
}

.google-logo {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
