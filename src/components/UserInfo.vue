<template>
  <div class="well well-sm small" v-if="user">
    <b class="text-display-block-element" v-if="!user.teacherId && user.name">{{ user.name }}</b>
    <b class="text-display-block-element"  v-if="user.teacherId && user.name">
      <a :href="'/teacher/view?id=' + user.teacherId">
        {{ user.name }}
      </a>
    </b>
    <i class="text-display-block-element" v-if="user.role">{{ user.role }}</i>
    <span class="text-display-block-element" v-if="user.roleId === '4'">{{ user.office }}</span>
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