<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

import { TransactionTypeEnum } from '../../shared/enums';
import { createTransactionInApi } from '../../services';

const router = useRouter();
const value = ref<string>("0");
const type = ref<TransactionTypeEnum>(TransactionTypeEnum.CREDIT);
const currentAccountId = inject<string>('current-account');

const createTransaction = async () => {
  const convertedValue = Number(value.value);
  if (!currentAccountId || !convertedValue || convertedValue < 1) {
    return;
  }
  await createTransactionInApi({
    type: type.value,
    value: convertedValue,
    targetAccountId: currentAccountId,
  });
  router.push('/account');
}
</script>

<template>
  <h1>Create Transaction</h1>
  <v-form validate-on="submit lazy" @submit.prevent="createTransaction">
    <v-text-field
      label="value"
      v-model="value"
      type="number"
      required
    ></v-text-field>
    <v-select
      label="type"
      :items="[TransactionTypeEnum.CREDIT, TransactionTypeEnum.PIX]"
      v-model="type"
      required
    ></v-select>
    <v-btn
      class="mt-2"
      text="Submit"
      type="submit"
      block
    ></v-btn>
  </v-form>
</template>