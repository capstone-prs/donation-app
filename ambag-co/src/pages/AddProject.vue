<template>
  <q-dialog full-width v-model="isDialogOpen">
    <q-card>
      <q-form @submit.prevent.stop="submitAddProject">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h5" style="color: teal">ADD A PROJECT</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <div class="q-ma-md">
          <q-input
            outlined
            :ref="data.project_name.ref"
            v-model="data.project_name.model.value"
            label="Project Name"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </div>

        <div class="q-ma-md">
          <q-input
            outlined
            :ref="data.project_goal.ref"
            v-model="data.project_goal.model.value"
            label="Target Fund"
            type="number"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </div>

        <div class="q-ma-md">
          <q-input
            outlined
            :ref="data.project_deadline.ref"
            v-model="data.project_deadline.model.value"
            label="Deadline"
            type="date"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </div>

        <!-- <q-card-section>
          <q-input
            outlined
            :ref="data.project_org.ref"
            v-model="data.project_deadline.model.value"
            label="Project Org"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </q-card-section> -->
        <div class="q-ma-md">
          <q-input
            outlined
            :ref="data.project_image.ref"
            v-model="data.project_image.model.value"
            label="Project Image URL"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </div>

        <div class="q-ma-md">
          <q-input
            outlined
            type="textarea"
            :ref="data.project_description.ref"
            v-model="data.project_description.model.value"
            label="Project Description"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
        </div>

        <div class="q-ma-md" align="center">
          <q-btn
            size="lg"
            color="teal"
            rounded
            label="submit"
            @click="submitAddProject"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar, QInput } from 'quasar';
// import { addProjects } from 'src/utils/firebase';
import { createAProject } from '../utils/blockchain';

const isDialogOpen = ref(false);

const data = {
  project_description: {
    ref: ref<QInput | null>(null),
    model: ref<string>(''),
  },
  project_goal: {
    ref: ref<QInput | null>(null),
    model: ref<number>(),
  },
  project_name: {
    ref: ref<QInput | null>(null),
    model: ref<string>(),
  },
  project_deadline: {
    ref: ref<QInput | null>(null),
    model: ref<string>(),
  },
  project_image: {
    ref: ref<QInput | null>(null),
    model: ref<string>(),
  },
};

const $q = useQuasar();

const triggerNotify = (type: string, message: string) => {
  $q.notify({
    type: type,
    message: message,
  });
};

const submitAddProject = async () => {
  $q.loading.show();
  Object.values(data).map((field) => field.ref.value?.validate());
  const hasErrors = Object.values(data).some(
    (field) => field.ref.value?.hasError
  );

  if (hasErrors) {
    return triggerNotify('negative', 'Some Fields are Missing');
  }
  const projectData = {
    project_name: data.project_name.model.value ?? '',
    project_description: data.project_description.model.value,
    project_goal: data.project_goal.model.value ?? 0,
    project_deadline: data.project_deadline.model.value ?? 0,
    project_image: data.project_image.model.value ?? '',
  };

  try {
    await createAProject(
      projectData.project_name,
      projectData.project_description,
      projectData.project_goal,
      new Date(projectData.project_deadline).getTime(),
      projectData.project_image
    );
    location.reload();
    $q.loading.hide();
    isDialogOpen.value = false;
    triggerNotify('positive', 'Project Added!');
  } catch (error) {
    $q.loading.hide();
    triggerNotify('negative', 'Something went wrong. Try again later');
  }
};
</script>
