<template>
  <q-layout>
    <q-header class="transparent">
      <q-btn
        icon="arrow_back_ios"
        text-color="teal"
        class="transparent q-ma-md"
        flat
        @click="navigateBack"
      />
    </q-header>
    <q-page-container class="absolute-center">
      <div class="row" style="width: 300px">
        <div class="row q-mb-sm text-h6" style="color: teal" align="center">
          Welcome to AMBAG.CO! Fill up the information to complete your signup.
        </div>

        <div class="q-ma-sm" style="width: 100%" align="center">
          <q-form @submit.prevent.stop="submit">
            <q-input
              class="q-mb-sm"
              id="name"
              :ref="data.name.ref"
              rounded
              outlined
              v-model="data.name.model.value"
              label="Your name"
              lazyRules
            >
              <template v-slot:prepend>
                <q-icon color="teal" name="person"
              /></template>
            </q-input>

            <q-input
              class="q-mb-sm"
              :ref="data.age.ref"
              rounded
              outlined
              v-model="data.age.model.value"
              type="number"
              label="Age"
              lazyRules
            >
              <template v-slot:prepend>
                <q-icon name="plus_one " color="teal" />
              </template>
            </q-input>

            <q-select
              class="q-mb-md"
              rounded
              outlined
              :ref="data.gender.ref"
              v-model="data.gender.model.value"
              :options="data.gender.options"
              label="Gender"
              lazyRules
            >
              <template v-slot:prepend>
                <q-icon name="wc" color="teal" />
              </template>
            </q-select>

            <q-btn
              size="20px"
              @click="submit"
              :isDisabled="isSubmitted"
              rounded
              color="teal"
              >SIGNUP</q-btn
            >
          </q-form>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { QInput, useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUid, addUser } from '../utils/firebase';
import { Gender } from '../types/Users';

const $q = useQuasar();
const router = useRouter();

const triggerNotify = (type: string, message: string) => {
  $q.notify({
    type: type,
    message: message,
  });
};

const navigateBack = () => {
  router.go(-1);
};

const isSubmitted = ref(false);
const data = {
  name: {
    ref: ref<QInput | null>(null),
    model: ref<string>(''),
  },
  gender: {
    ref: ref<QInput | null>(null),
    model: ref<Gender>(),
    options: ['Male', 'Female'],
  },
  age: {
    ref: ref<QInput | null>(null),
    model: ref<number>(),
  },
};

const showLoading = () => {
  $q.loading.show({
    spinnerColor: 'white',
    backgroundColor: 'black',
    message: 'Setting everthing up...',
  });

  setTimeout(() => {
    $q.loading.hide();
  }, 3000);
};

const submit = () => {
  const uid = getUid();
  if (
    data.name.model.value &&
    data.gender.model.value &&
    data.age.model.value &&
    uid
  ) {
    return addUser(
      {
        user_name: data.name.model.value,
        user_gender: data.gender.model.value,
        user_age: data.age.model.value,
      },
      uid
    )
      .then(() => triggerNotify('positive', 'Successful Sign Up'))
      .then(() => {
        showLoading();
        router.push('/home');
      });
  }
  // triggerNotify('negative', 'Failed Sign In');
};
</script>
