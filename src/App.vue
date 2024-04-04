<template>
  
  <component :is="layout + '-layout-vue'" v-if="layout"/>
</template>

<script>
import { computed } from 'vue'
import {useRoute} from 'vue-router'
import AuthLayoutVue from './layout/AuthLayout.vue'
import MainLayoutVue from './layout/MainLayout.vue'
export default {
  setup() {
    const route = useRoute()
    console.log(route.meta.layout);
    return {
      layout: computed( () => route.meta.layout)
    }
  },
  components: {AuthLayoutVue, MainLayoutVue}
}
</script>