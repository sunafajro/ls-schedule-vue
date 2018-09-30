<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <div v-if="actions.create || actions.hours">
      <h4 class="schedule-top-half-rem-margin">Действия:</h4>
      <button class="btn btn-success btn-sm btn-block" type="button" @click="$router.push('/create')" v-if="actions.create">
        <i class="fa fa-plus" aria-hidden="true"></i> Добавить
      </button>
      <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/hours')" v-if="actions.hours">
        <i class="fa fa-clock-o" aria-hidden="true"></i> Почасовка
      </button>
    </div>
    <div v-if="Object.keys(filters).length">
      <h4 class="schedule-top-half-rem-margin">Фильтры:</h4>
      <form @submit.prevent="onSubmit">
        <select class="form-control input-sm schedule-bottom-half-rem-margin" v-if="days.length > 1" v-model="did">
          <option :key="`opt-days-${i}`" :value="option.value" v-for="(option, i) in days">{{ option.text }}</option>
        </select>
        <select class="form-control input-sm schedule-bottom-half-rem-margin" v-if="offices.length > 1" v-model="oid">
          <option :key="`opt-office-${i}`" :value="option.value" v-for="(option, i) in offices">{{ option.text }}</option>
        </select>
        <select class="form-control input-sm schedule-bottom-half-rem-margin" v-if="languages.length > 1" v-model="lid">
          <option :key="`opt-language-${i}`" :value="option.value" v-for="(option, i) in languages">{{ option.text }}</option>
        </select>
        <select class="form-control input-sm schedule-bottom-half-rem-margin" v-if="forms.length > 1" v-model="fid">
          <option :key="`opt-eduform-${i}`" :value="option.value" v-for="(option, i) in forms">{{ option.text }}</option>
        </select>
        <select class="form-control input-sm schedule-bottom-half-rem-margin" v-if="ages.length > 1" v-model="aid">
          <option :key="`opt-eduage-${i}`" :value="option.value" v-for="(option, i) in ages">{{ option.text }}</option>
        </select>
        <select class="form-control input-sm schedule-bottom-half-rem-margin" v-if="teachers.length > 1" v-model="tid">
          <option :key="`opt-teacher-${i}`" :value="option.value" v-for="(option, i) in teachers">{{ option.text }}</option>
        </select>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 schedule-bottom-half-rem-margin">
            <button class="btn btn-info btn-sm btn-block" type="submit">
              <i class="fa fa-filter" aria-hidden="true"></i> Применить
            </button>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 schedule-bottom-half-rem-margin">
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
    actions: {
      required: true,
      type: Object
    },
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