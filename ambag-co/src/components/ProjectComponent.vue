<template>
  <div class="row">
    <div class="col">
      <q-card class="q-mb-lg q-ml-xl q-mr-xl project-card" @click="openProject">
        <q-card-section horizontal>
          <q-img :src="backgroundImage" height="150px" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">{{ projectTitle }}</div>
          <div class="text-subtitle2" style="color: grey">
            <q-icon name="paid" size="25px" color="teal" />
            {{ goalFunding }}
          </div>
          <div class="text-subtitle2" style="color: grey">
            <q-icon name="groups_2" size="25px" color="teal" />
            {{ targetRecipient }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div>
      <donate-dialog
        :recipient="targetRecipient"
        :target-fund="goalFunding"
        v-model="isDialogOpen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DonateDialog from './DonateDialog.vue';

defineProps({
  projectTitle: {
    type: String,
    required: true,
  },

  goalFunding: {
    type: Number,
    required: true,
  },
  targetRecipient: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
});

const isDialogOpen = ref(false);

const openProject = () => {
  isDialogOpen.value = true;
};
</script>

<style>
.project-card:hover {
  cursor: pointer;
}
</style>
