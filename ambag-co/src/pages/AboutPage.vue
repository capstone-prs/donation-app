<template>
  <q-layout>
    <q-header class="transparent q-ma-md">
      <HeaderLayout />
    </q-header>
    <q-page-container>
      <div
        class="text-h4 q-mb-lg q-ml-xl q-mr-xl"
        style="color: teal"
        align="center"
      >
        ABOUT
      </div>
      <div style="color: black">
        <p class="text-h7 q-ma-xl text-justify">
          Welcome to Ambag.co, where giving meets innovation!<br />
          <br />
          At <b>Ambag.co</b>, we believe in the power of collective generosity,
          and we've harnessed the revolutionary capabilities of cryptocurrency
          to make a meaningful impact on charitable giving. The name "Ambag.co"
          is a play on the Filipino phrase "ambag ko," which translates to "my
          contribution" in English. This reflects our commitment to fostering a
          community of givers who collectively make a positive difference in the
          world.
        </p>
        <q-separator class="q-ma-md" />
        <p class="text-h5 q-ma-xl text-justify" style="color: teal">
          OUR VISION
        </p>
        <p class="text-h7 q-ma-xl text-justify">
          Ambag.co envisions a world where philanthropy is accessible to
          everyone, transcending borders and barriers. By leveraging the
          efficiency and security of cryptocurrency, we aim to redefine the way
          people contribute to charitable causes, making the process seamless,
          transparent, and impactful.
        </p>

        <q-separator class="q-ma-md" />
        <p class="text-h5 q-ma-xl text-justify" style="color: teal">
          TRANSPARENCY AND SECURITY
        </p>
        <p class="text-h7 q-ma-xl text-justify">
          At Ambag.co, transparency is paramount. We utilize blockchain
          technology to provide a secure and transparent donation process. Every
          contribution is recorded on the blockchain, ensuring that donors can
          trace their funds and see the impact of their generosity.
        </p>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { colors } from 'quasar';
import HeaderLayout from '../layouts/HeaderLayout.vue';
</script>
