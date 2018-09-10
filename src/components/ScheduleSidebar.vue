<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-top-half-rem-margin">Действия:</h4>
    <button class="btn btn-success btn-sm btn-block" type="button" @click="$router.push('/schedule/create')">
      <font-awesome-icon icon="plus" /> Добавить
    </button>
    <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/schedule/hours')" v-if="user.roleId === '3' || user.roleId === '4'">
      <font-awesome-icon icon="clock" /> Почасовка
    </button>
    <h4 class="schedule-top-half-rem-margin">Фильтры:</h4>
    <form @submit.prevent="onSubmit">
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-bottom-half-rem-margin" v-if="days.length > 1" v-model="did">
        <option :key="`opt-days-${i}`" :value="option.value" v-for="(option, i) in days">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-bottom-half-rem-margin" v-if="offices.length > 1" v-model="oid">
        <option :key="`opt-office-${i}`" :value="option.value" v-for="(option, i) in offices">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-bottom-half-rem-margin" v-if="languages.length > 1" v-model="lid">
        <option :key="`opt-language-${i}`" :value="option.value" v-for="(option, i) in languages">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-bottom-half-rem-margin" v-if="forms.length > 1" v-model="fid">
        <option :key="`opt-eduform-${i}`" :value="option.value" v-for="(option, i) in forms">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-bottom-half-rem-margin" v-if="ages.length > 1" v-model="aid">
        <option :key="`opt-eduage-${i}`" :value="option.value" v-for="(option, i) in ages">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-bottom-half-rem-margin" v-if="teachers.length > 1" v-model="tid">
        <option :key="`opt-teacher-${i}`" :value="option.value" v-for="(option, i) in teachers">{{ option.text }}</option>
      </select>
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xs-6">
          <button class="btn btn-info btn-sm btn-block schedule-bottom-half-rem-margin" type="submit">
            <font-awesome-icon icon="filter" /> Применить
          </button>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-12 col-xs-6">
          <button class="btn btn-warning btn-sm btn-block schedule-bottom-half-rem-margin" @click="clearFilters" type="button">
            <font-awesome-icon icon="eraser" /> Сброс
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Info from "./UserInfo.vue";

export default {
  components: {
    "c-info": Info
  },
  computed: {
    ages() {
      const options = [{ value: null, text: "-все возрасты-" }].concat(
        Array.isArray(this.filters.eduages) ? this.filters.eduages : []
      );
      return options;
    },
    days() {
      const options = [{ value: null, text: "-все дни-" }].concat(
        Array.isArray(this.filters.days) ? this.filters.days : []
      );
      return options;
    },
    forms() {
      const options = [{ value: null, text: "-все формы-" }].concat(
        Array.isArray(this.filters.eduforms) ? this.filters.eduforms : []
      );
      return options;
    },
    languages() {
      const options = [{ value: null, text: "-все языки-" }].concat(
        Array.isArray(this.filters.languages) ? this.filters.languages : []
      );
      return options;
    },
    offices() {
      const options = [{ value: null, text: "-все офисы-" }].concat(
        Array.isArray(this.filters.offices) ? this.filters.offices : []
      );
      return options;
    },
    teachers() {
      const options = [{ value: null, text: "-все преподаватели-" }].concat(
        Array.isArray(this.filters.teachers) ? this.filters.teachers : []
      );
      return options;
    }
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
      tid: null
    };
  },
  methods: {
    clearFilters() {
      const keys = Object.keys(this.$data);
      keys.forEach(i => {
        this[i] = null;
      });
      this.filter();
    },
    onSubmit() {
      const keys = Object.keys(this.$data);
      const params = {};
      keys.forEach(i => {
        params[i] = this[i];
      });
      this.filter(params);
    }
  },
  props: {
    filter: {
      required: true,
      type: Function
    },
    filters: {
      required: true,
      type: Object
    },
    user: {
      required: true,
      type: Object
    }
  }
};
</script>