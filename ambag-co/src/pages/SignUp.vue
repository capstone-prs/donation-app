<template>
  <modal class="full-width column justify-center">
    <form @submit.prevent.stop="submit" class="q-gutter-md">
      <div class="element-signup">
        <div class="wrap" style="padding: 10px 0px 0px 10px">
          <q-btn
            class="glossy"
            round
            color="red"
            icon="arrow_back"
            @click="navigateBack"
          />
        </div>
        <div>
          <q-card-section class="q-md">
            <q-input
              class="authInputsBig"
              id="name"
              :ref="data.name.ref"
              rounded
              outlined
              v-model="data.name.model.value"
              label="Your name"
              lazyRules
            >
              <template v-slot:prepend> <q-icon name="person" /></template>
            </q-input>
          </q-card-section>

          <q-card-section class="q-md">
            <q-input
              :ref="data.age.ref"
              class="authInputsSmall"
              rounded
              outlined
              v-model="data.age.model.value"
              type="number"
              label="Age"
              lazyRules
            >
              <template v-slot:prepend>
                <q-icon name="img:/age-icon.svg " size="30px" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="q-md">
            <q-select
              class="authInputsSmall"
              rounded
              outlined
              :ref="data.gender.ref"
              v-model="data.gender.model.value"
              :options="data.gender.options"
              label="Gender"
              lazyRules
            >
              <template v-slot:prepend>
                <q-icon name="wc" />
              </template>
            </q-select>
          </q-card-section>
        </div>
        <div class="fixed-center">
          <button
            color="pink-12"
            text-color="white"
            class="text"
            @click="submit"
            :isDisabled="isSubmitted"
          >
            {{ Text }}
          </button>
        </div>
      </div>
    </form>
  </modal>
</template>

<script setup lang="ts">
import { QInput, useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUid, addUser } from '../utils/firebase';
import { Gender } from '../types/Users';

const $q = useQuasar();
const router = useRouter();

const Text = 'sign up';

// const props = defineProps<{ onSubmit: (formData: NewUser) => Promise<void> }>();

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
      .then(() => triggerNotify('positive', 'Successful Sign In'))
      .then(() => {
        showLoading();
        router.push('/');
      });
  }
  // triggerNotify('negative', 'Failed Sign In');
};
</script>
