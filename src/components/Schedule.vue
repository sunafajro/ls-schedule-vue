<template>
  <div class="row" v-if="scheduleActions.view">
    <c-sidebar/>
    <c-content/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Content from './ScheduleContent.vue';
import Sidebar from './ScheduleSidebar.vue';

export default {
  components: {
    'c-content': Content,
    'c-sidebar': Sidebar,
  },
  computed: {
    ...mapState([
      'defaultFilter',
      'filterParams',
      'scheduleActions'
    ]),
  },
  async created() {
    const params = {...this.defaultFilter, ...this.filterParams};
    await this.getScheduleLessons(params);
  },
  methods: {
    ...mapActions([
      'getScheduleLessons',
      'deleteScheduleLesson',
    ]),
  },
};
</script>