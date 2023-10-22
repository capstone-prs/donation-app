<template>
  <div>
    <!-- <p>{{ title }}</p> -->
    <button
      @click="
        () =>
          signin().then((e) => {
            if (e.success === false) {
              router.push('/signUp');
            }
          })
      "
    >
      Sign
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import signin from '../utils/firebase';

// import { Todo, Meta } from './models';

// interface Props {
//   title: string;
//   todos?: Todo[];
//   meta: Meta;
//   active: boolean;
// }
// const props = withDefaults(defineProps<Props>(), {
//   todos: () => [],
// });

const router = useRouter();
</script>
