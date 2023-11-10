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
          You will be donating to: <i>{{ recipient }} </i>
        </div>
        <div class="text-h7">
          Help them reach: <b>{{ targetFund }} ETH </b>
        </div>
      </q-card-section>
      <q-card-section align="center">
        <q-btn icon="paid" label="SEND" rounded outlined color="teal" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  recipient: {
    type: String,
    required: true,
  },
  targetFund: {
    type: Number,
    required: true,
  },
});

const openDialog = ref(false);
</script>
