<template>
  <q-dialog full-width v-model="isDialogOpen">
    <q-card>
      <q-form @submit.prevent.stop="submitAddProject">
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
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </q-card-section>

        <q-card-section>
          <q-input
            outlined
            :ref="data.project_goal.ref"
            v-model="data.project_goal.model.value"
            label="Project Goal"
            type="number"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            :ref="data.project_org.ref"
            v-model="data.project_org.model.value"
            label="Project Org"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            :ref="data.project_image.ref"
            v-model="data.project_image.model.value"
            label="Project Image URL"
            :rules="[(val) => !!val || 'Field is required']"
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
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
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
            @click="submitAddProject"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar, QInput } from 'quasar';
import { addProjects } from 'src/utils/firebase';

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
  },
  project_image: {
    ref: ref<QInput | null>(null),
    model: ref<string>()
  }
};

const $q = useQuasar();



const triggerNotify = (type: string, message: string) => {
  $q.notify({
    type: type,
    message: message
  });
};

const showLoading = () => {
  $q.loading.show({
    spinnerColor: 'white',
    backgroundColor: 'black',
  });

  setTimeout(() => {
    $q.loading.hide();
  }, 4000);
};


const submitAddProject = () => {

  Object.values(data).map((field) => field.ref.value?.validate());
  const hasErrors = Object.values(data).some(
    (field) => field.ref.value?.hasError
  );

  if (hasErrors) {
    return triggerNotify('negative', 'Some Fields are Missing');
  }
  const projectData = {
    project_description: data.project_description.model.value,
    project_goal: data.project_goal.model.value ?? 0,
    project_image: data.project_image.model.value ?? '',
    project_name: data.project_name.model.value ?? '',
    project_org: data.project_org.model.value ?? ''
  };
  return addProjects(projectData).then(() => {
    location.reload();
    showLoading();
    isDialogOpen.value = false;
    triggerNotify('positive', 'Project Added!');
  });
};
</script>
