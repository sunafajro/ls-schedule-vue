<template>
  <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <nav-component v-if="mode === 'bitrix'"/>
    <c-info/>
    <div v-if="scheduleActions.create || scheduleActions.view">
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
        @click="$router.push('/schedule/index')"
        v-if="scheduleActions.view"
      >
        <i class="fa fa-calendar" aria-hidden="true"></i> Расписание
      </button>
    </div>
    <div v-if="Array.isArray(scheduleFilters.offices) && scheduleFilters.offices.length">
      <h4 style="margin-top: 0.5rem">Фильтры:</h4>
      <form @submit.prevent="onSubmit">
        <select
          class="form-control input-sm"
          style="margin-bottom: 0.5rem"
          v-if="offices.length > 1"
          v-model="oid"
        >
          <option
            :key="'opt-offices-' + i"
            :value="option.value"
            v-for="(option, i) in offices"
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
import { mapState, mapActions } from 'vuex';
import Info from './UserInfo.vue';
import Navigation from '../helpers/Navigation';

export default {
  components: {
    'c-info': Info,
    'nav-component': Navigation,
  },
  computed: {
    ...mapState(['defaultFilter', 'mode', 'scheduleActions', 'scheduleFilters']),
    offices() {
      const options = [{ value: null, text: '-все офисы-' }].concat(
        Array.isArray(this.scheduleFilters.offices)
          ? this.scheduleFilters.offices
          : []
      );
      return options;
    },
  },
  created() {
    this.oid = this.defaultFilter.oid;
  },
  data() {
    return {
      oid: null,
    };
  },
  methods: {
    ...mapActions(['getTeacherHours']),
    async clearFilters() {
      this.oid = null;
      await this.getTeacherHours();
    },
    async onSubmit() {
      await this.getTeacherHours({ oid: this.oid });
    },
  },
};
</script>