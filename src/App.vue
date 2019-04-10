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
    ...mapState(['mode', 'user']),
  },
  async created() {
    const promises = [
      this.getCSRFToken(),
      this.getUserInfo(),
      this.getScheduleActions(),
      this.getScheduleFilters(),
    ];
    if (this.mode === 'bitrix') {
      promises.push(this.getNavLinks());
    }
    await Promise.all(promises);
  },
  methods: {
    ...mapActions([
      'getCSRFToken',
      'getNavLinks',
      'getScheduleActions',
      'getScheduleFilters',
      'getUserInfo',
    ]),
  },
};
</script>
