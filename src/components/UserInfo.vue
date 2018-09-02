<template>
  <b-card class="user-info-block" no-body v-if="user">
    <small v-if="!user.teacherId"><b v-if="user.name">{{ user.name }}</b></small>
    <small v-if="user.teacherId">
      <b v-if="user.name">
        <b-link :href="'/teacher/view?id=' + user.teacherId">
          {{ user.name }}
        </b-link>
      </b>
    </small>
    <small><i v-if="user.role">{{ user.role }}</i></small>
    <small><span v-if="user.roleId === '4'">{{ user.office }}</span></small>
  </b-card>
</template>

<script>
import bCard from "bootstrap-vue/es/components/card/card";
import bLink from "bootstrap-vue/es/components/link/link";

export default {
  components: {
    "b-card": bCard,
    "b-link": bLink,
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>
  .user-info-block {
    padding: 0.5rem;
  }
</style>