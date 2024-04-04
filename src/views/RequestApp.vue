<template>
    <app-loader v-if="loading"></app-loader>
    <app-page back title="Заявка" v-else-if="request">
      <p><strong>Имя владельца</strong>: {{request.data.fio}}</p>
      <p><strong>Телефон</strong>: {{request.data.phone}}</p>
      <p><strong>Сумма</strong>: {{currency(request.data.amount)}}</p>
      <p><strong>Статус</strong>: <app-status :type="request.data.status" /></p>
  
      <div class="form-control">
        <label for="status">Статус</label>
        <select id="status" v-model="status">
          <option value="done">Завершен</option>
          <option value="cancelled">Отменен</option>
          <option value="active">Активен</option>
          <option value="pending">Выполняется</option>
        </select>
      </div>
  
      <button class="btn danger" @click="remove">Удалить</button>
      <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
    </app-page>
    <h3 v-else class="text-center text-white">
      Заявки с ID = {{$route.params.id}} нет.
    </h3>
  </template>

<script>
import AppPage from "@/components/ui/AppPage.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watchEffect } from "vue";
import AppStatus from "@/components/ui/AppStatus.vue";
import AppLoader from "@/components/ui/AppLoader.vue";
import { currency } from "@/utils/currency-formatter";
import { useStore } from 'vuex';
export default {
  setup() {
    const loading = ref(true);
    const store = useStore();
    const router = useRouter()
    const status = ref()
    const route = useRoute();
    const request = ref({});
    const hasChanges = computed(() => request.value.status !== status.value)
    onMounted(async () => {
      loading.value = true;
      request.value = await store.dispatch("request/loadOne", route.params.id);
      status.value = request.value?.status
      loading.value = false;
    });

    const remove = async() => {
        await store.dispatch('request/remove', route.params.id)
        router.push('/')
    };
    const update = async() => {
        const data = {...request.value, status:status.value, id: route.params.id}
        await store.dispatch('request/update', data)
        request.value.status = status.value
    };
    console.log(route.params.id);
    watchEffect(() => {
        console.log(request.value.data);
    })
    return {
      loading,
      request,
      id: route.params.id,
      currency,
      remove,
      update,
      status,
      hasChanges
    };
  },

  components: { AppPage, AppStatus, AppLoader },
};
</script>