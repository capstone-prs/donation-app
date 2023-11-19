<template>
  <q-dialog v-model="openDialog" persistent>
    <q-card>
      <q-card-section class="row items-center" style="width: 300px">
        <div class="text-h5">Make a Donation</div>
        <q-space />
        <q-btn
          icon="close"
          color="teal"
          size="md"
          flat
          v-close-popup
          data-cy="close-btn"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h7">
          Help them reach: <b>{{ targetFund }} ETH </b>
        </div>
        <q-input
          standout
          suffix="ETH"
          outlined
          filled
          :ref="data.project_goal.ref"
          v-model="data.project_goal.model.value"
          label="Enter donation"
          type="number"
          :rules="[(val) => !!val || 'Field is required']"
          lazy-rules
          class="q-mt-md"
        />
      </q-card-section>
      <q-card-section class="row" align="center">
        <q-btn
          icon="info"
          label="VIEW"
          rounded
          outline
          color="teal"
          @click="navigateTo(index)"
        />
        <q-space />
        <q-btn
          icon="paid"
          label="SEND"
          rounded
          outlined
          color="teal"
          @click="triggerDonation"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fundAProject } from '../utils/blockchain';
import { QInput } from 'quasar';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const openDialog = ref(false);
const router = useRouter();

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Number,
    required: true,
  },
  targetFund: {
    type: Number,
    required: true,
  },
});

const data = {
  project_goal: {
    ref: ref<QInput | null>(null),
    model: ref<number>(),
  },
};

const triggerNotify = (type: string, message: string) => {
  $q.notify({
    type: type,
    message: message,
  });
};

const triggerDonation = async () => {
  $q.loading.show();

  try {
    await fundAProject(props.index, data.project_goal.model.value as number);
    location.reload();
    $q.loading.hide();
    openDialog.value = false;
    triggerNotify('positive', 'Successfully donated!');
  } catch (error) {
    $q.loading.hide();
    triggerNotify('negative', 'Something went wrong. Try again later');
  }
};

const navigateTo = (id: number) => {
  router.push({ name: 'project', params: { param: id } });
};
</script>
