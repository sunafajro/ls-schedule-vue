<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <table class="table table-bordered table-hover table-sm table-striped">
      <thead v-if="columns.length">
        <tr>
          <th :class="item.thClass" :key="`th-key-${item.id}`" v-for="item in columns">{{ item.title }}</th>
        </tr>
      </thead>
      <tbody v-if="hours.length">
        <tr :key="`tr-key-${item.id}`" v-for="item in hours">
          <td v-if="!item.rowspan">{{ item.teacher }}</td>
          <td :rowspan="item.rowspan" v-if="item.rowspan > 1">{{ item.teacher }}</td>
          <td>{{ item.language }}</td>
          <td>{{ item.hours }}</td>
        </tr>
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
    hours: {
      required: true,
      type: Array
    }
  }
};
</script>
