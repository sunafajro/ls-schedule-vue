<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <breadcrumbs-component type="coefficients" v-if="mode === 'bitrix'"/>
    <div :key="'office-' + o" v-for="o in Object.keys(scheduleRows)">
      <h3>{{ scheduleRows[o].name }}</h3>
      <table class="table table-bordered table-hover table-condensed table-striped small">
        <thead>
          <tr>
            <th :style="c.style" v-for="c in filteredColumns" :key="'th-' + c.id">{{ c.title }}</th>
          </tr>
        </thead>
        <tbody v-if="Array.isArray(scheduleRows[o].rows) && scheduleRows[o].rows.length">
          <tr :key="'tr-' + l.id" v-for="l in scheduleRows[o].rows">
            <td :key="'td-' + l.id + '-' + c.id" v-for="c in filteredColumns">
              <div v-if="c.id === 'day'">{{ dayName(l[c.id]) }}</div>
              <div v-if="c.id === 'group'">
                <a :href="'/groupteacher/view?id=' + l.groupId">{{ l[c.id] }}</a>
              </div>
              <div v-if="c.id === 'teacher'">
                <a :href="'/teacher/view?id=' + l.teacherId">{{ l[c.id] }}</a>
              </div>
              <div v-if="c.id === 'actions'" class="text-center">
                <a
                  href="#"
                  @click.prevent="deleteLesson(l.id)"
                  title="Удалить занятие"
                  v-if="user.roleId !== '5' || (user.roleId === '5' && user.teacherId === l.teacherId)"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </a>
              </div>
              <comment-component v-if="c.id === 'notes'" class="text-center" :lessonId="l.id" :value="l[c.id]" />
              <div v-if="['day', 'group', 'teacher', 'notes', 'actions'].indexOf(c.id) === -1">
                {{ l[c.id] }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { createDaysObjectItems } from '../utils';
import Breadcrumbs from '../helpers/Breadcrumbs.vue';
import Comment from './Comment';

export default {
  components: {
    'breadcrumbs-component': Breadcrumbs,
    'comment-component': Comment,
  },
  computed: {
    ...mapState([
      'filterParams',
      'mode',
      'scheduleColumns',
      'scheduleRows',
      'user',
    ]),
    days() {
      return createDaysObjectItems();
    },
    filteredColumns() {
      return this.scheduleColumns.filter(column => column.show);
    },
  },
  methods: {
    ...mapActions(['deleteScheduleLesson', 'getScheduleLessons']),
    dayName(num) {
      return this.days[num];
    },
    async deleteLesson(id) {
      await this.deleteScheduleLesson({ id });
      await this.getScheduleLessons(this.filterParams);
    },
  },
};
</script>
