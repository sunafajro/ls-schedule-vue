<template>
  <b-col sm="12" md="10" lg="10" xl="10">
    <table class="table table-bordered table-condensed table-hover table-striped small">
      <thead>
        <tr>
          <th :class="column.thClass" v-for="column in columns" :key="'th-key-' + column.id">{{ column.title }}</th>
        </tr>
      </thead>
    </table>
  </b-col>
</template>

<script>
import bCol from "bootstrap-vue/es/components/layout/col";

export default {
  components: {
    "b-col": bCol
  },
  data() {
    return {
      columns: [
        {
          id: 1,
          thClass: "tbl-cell-10",
          title: "Преподаватель"
        },
        {
          id: 2,
          thClass: "tbl-cell-10",
          title: "Язык"
        },
        {
          id: 3,
          thClass: "tbl-cell-10",
          title: "Часы"
        }
      ]
    };
  }
};
</script>
