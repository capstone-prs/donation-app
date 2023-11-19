<template>
  <q-btn
    @click="onClick"
    class="google-login-button"
    outline
    rounded
    color="teal"
    size="sm"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
      alt="Google Logo"
      class="google-logo"
    />
    Sign in with Google
  </q-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import signin from '../../utils/firebase';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

const onClick = () =>
  signin().then((e) => {
    if (!e.success) {
      router.push('/signUp');
    } else if (e.success) {
      $q.notify({
        type: 'positive',
        message: 'Successful Log In',
      });
      router.push('/home');
    }
  });
</script>
<style>
.google-login-button {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bolder;
  padding: 15px;
}

.google-logo {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
