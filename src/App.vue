<template>
  <div id="schedule">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  async created() {
    await this.getCSRFToken();
    await this.getUserInfo();
    await this.getScheduleActions();
    await this.getScheduleFilters();
  },
  methods: {
    ...mapActions([
      'getCSRFToken',
      'getScheduleActions',
      'getScheduleFilters',
      'getUserInfo',
    ]),
  },
};
</script>
