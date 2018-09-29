<template>
  <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-top-half-rem-margin">Действия:</h4>
    <button class="btn btn-success btn-sm btn-block" type="button" @click="$router.push('/create')">
      <i class="fa fa-plus" aria-hidden="true"></i> Добавить
    </button>
    <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/')">
      <i class="fa fa-calendar" aria-hidden="true"></i> Расписание
    </button>
    <h4 class="schedule-top-half-rem-margin">Фильтры:</h4>
    <form @submit.prevent="onSubmit">
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-bottom-half-rem-margin" v-if="offices.length > 1" v-model="oid">
        <option :key="`opt-offices-${i}`" :value="option.value" v-for="(option, i) in offices">{{ option.text }}</option>
      </select>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 schedule-bottom-half-rem-margin">
          <button class="btn btn-info btn-sm btn-block" type="submit">
            <i class="fa fa-filter" aria-hidden="true"></i> Применить
          </button>
        </div>
        <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 schedule-bottom-half-rem-margin">
          <button class="btn btn-warning btn-sm btn-block" @click="clearFilters" type="button">
            <i class="fa fa-eraser" aria-hidden="true"></i> Сброс
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Info from "./UserInfo.vue";

export default {
  data() {
    return {
      oid: null
    };
  },
  components: {
    "c-info": Info
  },
  computed: {
    offices() {
      const options = [{ value: null, text: "-все офисы-" }].concat(
        Array.isArray(this.filters.offices) ? this.filters.offices : []
      );
      return options;
    }
  },
  methods: {
    clearFilters() {
      this.oid = null;
      this.filter();
    },
    onSubmit() {
      this.filter({ oid: this.oid });
    }
  },
  props: {
    filter: {
      require: true,
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