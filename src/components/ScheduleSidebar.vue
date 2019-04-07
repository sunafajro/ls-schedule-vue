<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info/>
    <div v-if="scheduleActions.create || scheduleActions.hours">
      <h4 style="margin-top: 0.5rem">Действия:</h4>
      <button
        class="btn btn-success btn-sm btn-block"
        type="button"
        @click="$router.push('/schedule/create')"
        v-if="scheduleActions.create"
      >
        <i class="fa fa-plus" aria-hidden="true"></i> Добавить
      </button>
      <button
        class="btn btn-secondary btn-sm btn-block"
        type="button"
        @click="$router.push('/schedule/hours')"
        v-if="scheduleActions.hours"
      >
        <i class="fa fa-clock-o" aria-hidden="true"></i> Почасовка
      </button>
    </div>
    <div v-if="Object.keys(scheduleFilters).length">
      <h4 style="margin-top: 0.5rem">Фильтры:</h4>
      <form @submit.prevent="onSubmit">
        <select
          class="form-control input-sm"
          style="margin-bottom: 0.5rem"
          v-if="days.length > 1"
          v-model="did"
        >
          <option
            :key="`opt-days-${i}`"
            :value="option.value"
            v-for="(option, i) in days"
          >{{ option.text }}</option>
        </select>
        <select
          class="form-control input-sm"
          style="margin-bottom: 0.5rem"
          v-if="offices.length > 1"
          v-model="oid"
        >
          <option
            :key="`opt-office-${i}`"
            :value="option.value"
            v-for="(option, i) in offices"
          >{{ option.text }}</option>
        </select>
        <select
          class="form-control input-sm"
          style="margin-bottom: 0.5rem"
          v-if="languages.length > 1"
          v-model="lid"
        >
          <option
            :key="`opt-language-${i}`"
            :value="option.value"
            v-for="(option, i) in languages"
          >{{ option.text }}</option>
        </select>
        <select
          class="form-control input-sm"
          style="margin-bottom: 0.5rem"
          v-if="forms.length > 1"
          v-model="fid"
        >
          <option
            :key="`opt-eduform-${i}`"
            :value="option.value"
            v-for="(option, i) in forms"
          >{{ option.text }}</option>
        </select>
        <select
          class="form-control input-sm"
          style="margin-bottom: 0.5rem"
          v-if="ages.length > 1"
          v-model="aid"
        >
          <option
            :key="`opt-eduage-${i}`"
            :value="option.value"
            v-for="(option, i) in ages"
          >{{ option.text }}</option>
        </select>
        <select
          class="form-control input-sm"
          style="margin-bottom: 0.5rem"
          v-if="teachers.length > 1"
          v-model="tid"
        >
          <option
            :key="`opt-teacher-${i}`"
            :value="option.value"
            v-for="(option, i) in teachers"
          >{{ option.text }}</option>
        </select>
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
            style="margin-bottom: 0.5rem"
          >
            <button class="btn btn-info btn-sm btn-block" type="submit">
              <i class="fa fa-filter" aria-hidden="true"></i> Применить
            </button>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
            style="margin-bottom: 0.5rem"
          >
            <button class="btn btn-warning btn-sm btn-block" @click="clearFilters" type="button">
              <i class="fa fa-eraser" aria-hidden="true"></i> Сброс
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Info from './UserInfo.vue';

export default {
  components: {
    'c-info': Info,
  },
  computed: {
    ...mapState(['clearScheduleFilters', 'defaultFilter', 'scheduleActions', 'scheduleFilters']),
    ages() {
      const options = [{ value: null, text: '-все возрасты-' }].concat(
        Array.isArray(this.scheduleFilters.eduages)
          ? this.scheduleFilters.eduages
          : []
      );
      return options;
    },
    days() {
      const options = [{ value: null, text: '-все дни-' }].concat(
        Array.isArray(this.scheduleFilters.days)
          ? this.scheduleFilters.days
          : []
      );
      return options;
    },
    forms() {
      const options = [{ value: null, text: '-все формы-' }].concat(
        Array.isArray(this.scheduleFilters.eduforms)
          ? this.scheduleFilters.eduforms
          : []
      );
      return options;
    },
    languages() {
      const options = [{ value: null, text: '-все языки-' }].concat(
        Array.isArray(this.scheduleFilters.languages)
          ? this.scheduleFilters.languages
          : []
      );
      return options;
    },
    offices() {
      const options = [{ value: null, text: '-все офисы-' }].concat(
        Array.isArray(this.scheduleFilters.offices)
          ? this.scheduleFilters.offices
          : []
      );
      return options;
    },
    teachers() {
      const options = [{ value: null, text: '-все преподаватели-' }].concat(
        Array.isArray(this.scheduleFilters.teachers)
          ? this.scheduleFilters.teachers
          : []
      );
      return options;
    },
  },
  created() {
    this.did = this.defaultFilter.did;
    this.oid = this.defaultFilter.oid;
    this.tid = this.defaultFilter.tid;
  },
  data() {
    return {
      // возраст
      aid: null,
      // день недели
      did: null,
      // форма обучения
      fid: null,
      // язык
      lid: null,
      // офис
      oid: null,
      // преподаватель
      tid: null,
    };
  },
  methods: {
    ...mapActions(['getScheduleLessons']),
    async clearFilters() {
      const keys = Object.keys(this.$data);
      keys.forEach(i => {
        this[i] = null;
      });
      await this.getScheduleLessons();
    },
    async onSubmit() {
      const keys = Object.keys(this.$data);
      const params = {};
      keys.forEach(i => {
        params[i] = this[i];
      });
      await this.getScheduleLessons(params);
    },
  },
};
</script>