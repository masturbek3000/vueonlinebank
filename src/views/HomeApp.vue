<template>
  <app-loader v-if="loading"/>
  <app-page-vue title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-filter-vue v-model="filter"></request-filter-vue>
    <request-table-vue :requests="requests"></request-table-vue>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <RequestModalVue @created="modal = false"/>
      </app-modal>
    </teleport>
  </app-page-vue>
</template>
  
  <script>
import AppPageVue from "@/components/ui/AppPage.vue";
import RequestTableVue from '@/components/request/RequestTable.vue';
import AppModal from "@/components/ui/AppModal.vue";
import { ref, computed, onMounted } from 'vue';
import RequestModalVue from '@/components/request/RequestModal.vue';
import { useStore } from 'vuex';
import AppLoader from '@/components/ui/AppLoader.vue';
import RequestFilterVue from '@/components/request/RequestFilter.vue';
export default {
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false

    })

    const requests = computed(() => store.getters['request/requests'].filter(request => {
      if (filter.value.name) {
        return request.fio.includes(filter.value.name)
      }
      return request
    })
      .filter(request => {
        if (filter.value.status) {
          return filter.value.status === request.status 
        }
        return request
      })
    );  

    console.log(requests);


    return {
      modal, requests, loading, filter
    }
  },
  components: { AppPageVue, RequestTableVue, AppModal, RequestModalVue, AppLoader, RequestFilterVue},
};

</script>
  