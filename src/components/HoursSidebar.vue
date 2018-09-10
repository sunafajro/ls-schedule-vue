<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-top-half-rem-margin">Действия:</h4>
    <button class="btn btn-success btn-sm btn-block" type="button" @click="$router.push('/schedule/create')">
      <font-awesome-icon icon="plus" /> Добавить
    </button>
    <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/schedule/index')">
      <font-awesome-icon icon="calendar-alt" /> Расписание
    </button>
    <h4 class="schedule-top-half-rem-margin">Фильтры:</h4>
    <form @submit.prevent="onSubmit">
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-bottom-half-rem-margin" v-if="offices.length > 1" v-model="oid">
        <option :key="`opt-offices-${i}`" :value="option.value" v-for="(option, i) in offices">{{ option.text }}</option>
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