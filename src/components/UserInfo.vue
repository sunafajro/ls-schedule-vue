<template>
  <div class="card user-info-block" v-if="user">
    <small v-if="!user.teacherId"><b v-if="user.name">{{ user.name }}</b></small>
    <small v-if="user.teacherId">
      <b v-if="user.name">
        <a :href="'/teacher/view?id=' + user.teacherId">
          {{ user.name }}
        </a>
      </b>
    </small>
    <small><i v-if="user.role">{{ user.role }}</i></small>
    <small><span v-if="user.roleId === '4'">{{ user.office }}</span></small>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object
    }
  }
};
</script>