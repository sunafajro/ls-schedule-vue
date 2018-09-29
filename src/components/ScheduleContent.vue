<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <table class="table table-bordered table-hover table-condensed table-striped small">
      <thead>
        <tr>
          <th :class="item.thClass" v-for="item in columns" :key="`th-key-${item.id}`">{{ item.title }}</th>
        </tr>
      </thead>
      <tbody v-if="lessons.length">
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    columns: {
      required: true,
      type: Array
    },
    lessons: {
      required: true,
      type: Array
    }
  }
};
</script>
