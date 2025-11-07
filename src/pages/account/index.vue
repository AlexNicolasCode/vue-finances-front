<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { refDebounced } from '@vueuse/core';

import type { Transaction } from './types';
import { apiClient } from '../../clients';

const isLoading = ref<boolean>(true);
const searchRef = ref<string>('');
const searchDebounced = refDebounced(searchRef, 500);
const transactions = ref<Transaction[]>([{
  id: 'random-uuid',
  accountName: 'tester',
  type: 'pix',
  value: '10.20',
}]);

const loadTransactions = async (search?: string): Promise<void> => {
  try {
    isLoading.value = true;
    const { data: apiTransactions } = await apiClient.request<Transaction[]>({
      method: 'get',
      url: 'transactions',
      params: {
        search: search && search.length > 3 ? search : null,
      },
    });
    transactions.value = apiTransactions;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadTransactions();
});

watch(searchDebounced, async (newValue, _) => {
  if (newValue.length <= 3) {
    loadTransactions();
    return;
  }
  loadTransactions(newValue);
});
</script>

<template>
  <h1>Transactions</h1>
  <v-text-field
    v-model="searchRef"
    label="Search transactions"
    variant="outlined"
    hide-details
    single-line
  ></v-text-field>
  <ul>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      :size="48"
    ></v-progress-circular>
    <li v-else v-for="transaction in transactions">
      {{ transaction.accountName }}<br/>
      {{ transaction.status }}<br/>
      {{ transaction.type }}<br/>
      {{ transaction.value }}<br/>
    </li>
  </ul>
</template>