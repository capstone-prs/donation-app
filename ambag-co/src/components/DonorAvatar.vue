<template>
  <q-card class="q-ma-md">
    <q-item>
      <q-item-section avatar>
        <q-avatar color="green" text-color="white">
          <q-icon name="paid" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ trimAddress(address) }}</q-item-label>
        <q-item-label caption> {{ donation }} ETH</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
defineProps({
  address: {
    type: String,
    required: true,
  },
  donation: {
    type: String,
    required: true,
  },
});

const trimAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return '';

  const trimmedStart = address.slice(0, startChars);
  const trimmedEnd = address.slice(-endChars);

  return `${trimmedStart}...${trimmedEnd}`;
};
</script>
