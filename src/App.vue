<template>
  <div id="schedule">
    <div
      class="alert alert-warning"
      v-if="!user || (user && !Object.keys(user).length)"
    >Загрузка приложения...</div>
    <router-view v-if="user && Object.keys(user).length"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  async created() {
    const promises = [
      this.getCSRFToken(),
      this.getUserInfo(),
      this.getScheduleActions(),
      this.getScheduleFilters(),
    ];
    await Promise.all(promises);
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
