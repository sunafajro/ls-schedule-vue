<template>
  <div class="row" v-if="scheduleActions.hours">
    <c-sidebar/>
    <c-content/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Content from './HoursContent.vue';
import Sidebar from './HoursSidebar.vue';

export default {
  components: {
    'c-content': Content,
    'c-sidebar': Sidebar,
  },
  computed: {
    ...mapState(['scheduleActions']),
  },
  async created() {
    await this.getTeacherHours();
  },
  methods: {
    ...mapActions(['getTeacherHours']),
  },
};
</script>