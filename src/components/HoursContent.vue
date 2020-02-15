<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <breadcrumbs-component type="coefficients" v-if="mode === 'bitrix'"/>
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
          <td class="text-center" v-if="!item.rowspan">{{ item.teacher }}</td>
          <td class="text-center" style="vertical-align: middle" :rowspan="item.rowspan" v-if="item.rowspan > 1">{{ item.teacher }}</td>
          <td class="text-center">{{ item.language }}</td>
          <td class="text-center">{{ item.hoursByService | formatNumbers }}</td>
          <td class="text-center">{{ item.hoursBySchedule | formatNumbers }}</td>
          <td class="text-center" v-if="!item.rowspan">{{ item.actualHours | formatNumbers }}</td>
          <td class="text-center" style="vertical-align: middle" :rowspan="item.rowspan" v-if="item.rowspan > 1">{{ item.actualHours | formatNumbers }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { prepareRows } from '../utils';
import Breadcrumbs from '../helpers/Breadcrumbs.vue';

export default {
  components: {
    'breadcrumbs-component': Breadcrumbs,
  },
  computed: {
    ...mapState(['hoursRows', 'hoursColumns', 'mode']),
    filteresColumns() {
      return this.hoursColumns.filter(column => column.show);
    },
    preparedHours() {
      return prepareRows(this.hoursRows);
    },
  },
  filters: {
    formatNumbers($num) {
      return $num % 1 === 0 ? $num : $num.toFixed(2);
    }
  },
};
</script>
