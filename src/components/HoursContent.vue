<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <table class="table table-bordered table-hover table-condensed table-striped small">
      <thead v-if="filteresColumns.length">
        <tr>
          <th
            :class="item.thClass"
            :key="'th-key-' + item.id"
            v-for="item in filteresColumns"
          >{{ item.title }}</th>
        </tr>
      </thead>
      <tbody v-if="preparedHours.length">
        <tr :key="'tr-key-' + item.id" v-for="item in preparedHours">
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
import { mapState } from 'vuex';
import { prepareRows } from '../utils';

export default {
  computed: {
    ...mapState(['hoursRows', 'hoursColumns']),
    filteresColumns() {
      return this.hoursColumns.filter(column => column.show);
    },
    preparedHours() {
      return prepareRows(this.hoursRows);
    },
  },
};
</script>
