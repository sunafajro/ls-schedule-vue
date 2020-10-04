<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <breadcrumbs-component type="coefficients" v-if="mode === 'bitrix'"/>
    <c-form />
    <div>
      <h4>Добавленные занятия:</h4>
      <table class="table table-striped table-hover table-bordered table-condensed small">
        <thead>
          <tr>
            <th>День</th>
            <th>Офис</th>
            <th>Кабинет</th>
            <th>Время</th>
            <th>Преподаватель</th>
            <th>Группа</th>
            <th>Примечания</th>
            <th>Действ.</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(item, index) in addedLessons">
            <td>{{ idToValue(item.calc_denned,'day') }}</td>
            <td>{{ idToValue(item.calc_office, 'office') }}</td>
            <td>{{ idToValue(item.calc_cabinetoffice, 'room') }}</td>
            <td>{{ item.time_begin }} - {{ item.time_end }}</td>
            <td>{{ idToValue(item.calc_teacher, 'teacher') }}</td>
            <td>{{ idToValue(item.calc_groupteacher, 'group') }}</td>
            <td>{{ item.notes }}</td>
            <td class="text-center">
              <a href="#" @click.prevent="deleteCreatedLesson(item.id)" title="Удалить занятие">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Breadcrumbs from '../helpers/Breadcrumbs.vue';
import Form from './Form.vue';
import {
  createDaysSelectItems,
  createHoursSelectItems,
  createMinutesSelectItems,
} from '../utils';

export default {
  components: {
    'breadcrumbs-component': Breadcrumbs,
    'c-form': Form,
  },
  computed: {
    ...mapState([
      'addedLessons',
      'mode',
      'groups',
      'offices',
      'rooms',
      'teachers',
    ]),
    optionsDay() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        createDaysSelectItems()
      );
      return options;
    },
    optionsHours() {
      const options = [{ value: null, text: '-часы-' }].concat(
        createHoursSelectItems()
      );
      return options;
    },
    optionsMinutes() {
      const options = [{ value: null, text: '-минуты-' }].concat(
        createMinutesSelectItems()
      );
      return options;
    },
    optionsOffice() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        Array.isArray(this.offices) ? this.offices : []
      );
      return options;
    },
    optionsRoom() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        Array.isArray(this.rooms) ? this.rooms : []
      );
      return options;
    },
    optionsGroup() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        Array.isArray(this.groups) ? this.groups : []
      );
      return options;
    },
    optionsTeacher() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        Array.isArray(this.teachers) ? this.teachers : []
      );
      return options;
    },
  },
  unmounted() {
    this.updateAddedLessons([]);
  },
  methods: {
    ...mapActions([
        'deleteScheduleLesson',
    ]),
    ...mapMutations([
      'updateAddedLessons',
    ]),
    idToValue(id, key) {
      let result = '';
      switch (key) {
        case 'day':
          {
            const tmp = this.optionsDay.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : '';
          }
          break;
        case 'office':
          {
            const tmp = this.optionsOffice.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : '';
          }
          break;
        case 'room':
          {
            const tmp = this.optionsRoom.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : '';
          }
          break;
        case 'teacher':
          {
            const tmp = this.optionsTeacher.filter(
              item => item.value === id
            )[0];
            result = tmp ? tmp.text : '';
          }
          break;
        case 'group':
          {
            const tmp = this.optionsGroup.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : '';
          }
          break;
      }
      return result;
    },
    async deleteCreatedLesson(id) {
      await this.deleteScheduleLesson({ id });
    },
  },
};
</script>