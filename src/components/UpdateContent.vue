<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <breadcrumbs-component type="coefficients" v-if="mode === 'bitrix'"/>
    <c-form />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Breadcrumbs from '../helpers/Breadcrumbs.vue';
import Form from './Form.vue';

export default {
  components: {
    'breadcrumbs-component': Breadcrumbs,
    'c-form': Form,
  },
  computed: {
    ...mapState([
      'mode',
    ]),
  },
};
</script>