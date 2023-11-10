<template>
  <q-dialog full-width v-model="isDialogOpen">
    <q-card>
      <q-form @submit.prevent.stop="submit">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Project</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            outlined
            :ref="data.project_name.ref"
            v-model="data.project_name.model.value"
            label="Project Name"
            :rules="[
              (val) => !!val || 'Please Have a Project Name',
            ]"
            lazy-rules
          />
        </q-card-section>

        <q-card-section>
          <q-input
            outlined
            :ref="data.project_goal.ref"
            v-model="data.project_goal.model.value"
            label="Project Goal"
            :rules="[
              (val) => !!val || 'Please Have a Project Goal',
            ]"
            lazy-rules
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            :ref="data.project_org.ref"
            v-model="data.project_org.model.value"
            label="Project Org"
            :rules="[
              (val) => !!val || 'Please Have a Project Org',
            ]"
            lazy-rules
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            type="textarea"
            :ref="data.project_description.ref"
            v-model="data.project_description.model.value"
            label="Project Description"
            :rules="[
              (val) => !!val || 'Please Have a Discription',
            ]"
            lazy-rules
          />
        </q-card-section>
        <q-card-section>
          <q-uploader
            style="max-width: 300px"
            url="http://localhost:4444/upload"
            label="Restricted to images"
            multiple
            accept=".jpg, image/*"
            @rejected="onReject"
          />
        </q-card-section>
        <q-card-section class="q-pb-xl q-pt-sm">
          <q-btn
            size="md"
            style="position: absolute; left: 70%"
            color="teal"
            outline
            rounded
            label="submit"
            @click="submit"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar, QInput } from 'quasar';
import { addProjects, getProjects } from 'src/utils/firebase';

const isDialogOpen = ref(false);

const data = {
  project_description: {
    ref: ref<QInput | null>(null),
    model: ref<string>('')
  },
  project_goal: {
    ref: ref<QInput | null>(null),
    model: ref<number>()
  },
  project_name: {
    ref: ref<QInput | null>(null),
    model: ref<string>()
  },
  project_org: {
    ref: ref<QInput | null>(null),
    model: ref<string>()
  }
};
getProjects().then(console.log);
const $q = useQuasar();
const onReject = () => {
  console.log('yoiw');
  $q.notify({
    type: 'negative',
    message: 'upload error'
  });
};



const submit = () => {

  console.log()
  addProjects({
    project_description: data.project_description.model.value,
    project_goal: data.project_goal.model.value ?? 0,
    project_image: '',
    project_name: data.project_name.model.value ?? '',
    project_org: data.project_org.model.value ?? ''
  });
};
</script>
