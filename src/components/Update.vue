<template>
  <div class="row" v-if="scheduleActions.update">
    <c-sidebar/>
    <c-content/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Content from './UpdateContent.vue';
import Sidebar from './CreateSidebar.vue';

export default {
  components: {
    'c-content': Content,
    'c-sidebar': Sidebar,
  },
  computed: {
    ...mapState(['scheduleActions']),
  },
  async created() {
    await this.getOffices();
    await this.getTeachers();
  },
  methods: {
    ...mapActions(['getOffices', 'getTeachers']),
  },
};
</script>