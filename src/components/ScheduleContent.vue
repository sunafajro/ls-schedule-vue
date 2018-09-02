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
          title: "День"
        },
        {
          id: 2,
          thClass: "tbl-cell-10",
          title: "Кабинет"
        },
        {
          id: 3,
          thClass: "tbl-cell-10",
          title: "Время"
        },
        {
          id: 4,
          thClass: "tbl-cell-20",
          title: "Преподаватель"
        },
        {
          id: 5,
          thClass: "tbl-cell-40",
          title: "Услуга"
        },
        {
          id: 6,
          thClass: "tbl-cell-5 text-center",
          title: "Действ."
        }
      ]
    };
  }
};
</script>
