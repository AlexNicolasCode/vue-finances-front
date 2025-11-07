<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { refDebounced } from '@vueuse/core';
import BackToHomeButton from '../../components/back-to-home-button.vue';

import type { Transaction } from './types';
import { apiClient } from '../../clients';

const isLoading = ref<boolean>(true);
const searchRef = ref<string>('');
const searchDebounced = refDebounced(searchRef, 500);
const transactions = ref<Transaction[]>([]);

const loadTransactions = async (search: string = ""): Promise<void> => {
  try {
    isLoading.value = true;
    const { data: apiTransactions } = await apiClient.request<Transaction[]>({
      method: 'get',
      url: 'transactions',
      params: {
        search,
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
  <v-container>
    <v-row>
      <v-col>
        <BackToHomeButton />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="justify-center">Transactions</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <main class="mt-2">
          <v-text-field
            v-model="searchRef"
            label="Search transactions"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
          <v-card class="overflow-y-auto" min-height="65vh" max-height="65vh">
            <section class="mt-2">
              <ul class="h-2 overflow-auto">
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  :size="48"
                ></v-progress-circular>
                <li v-else v-for="transaction in transactions">
                  <v-card-text>
                    <h3>{{ transaction.accountName }}</h3><br/>
                    {{ transaction.status }}<br/>
                    {{ transaction.type }}<br/>
                    {{ transaction.value }}<br/>
                  </v-card-text>
                </li>
              </ul>
            </section>
          </v-card>
        </main>
      </v-col>
    </v-row>
  </v-container>
</template>