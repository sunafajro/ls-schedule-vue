<template>
  <b-col sm="12" md="2" lg="2" xl="2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-headers-margin">Действия:</h4>
    <b-button :block="true" size="sm" variant="success" @click="$router.push('/schedule/create')">
      <font-awesome-icon icon="plus" /> Добавить
    </b-button>
    <b-button :block="true" size="sm" @click="$router.push('/schedule/index')">
      <font-awesome-icon icon="calendar-alt" /> Расписание
    </b-button>
    <h4 class="schedule-headers-margin" v-if="showFilters">Фильтры:</h4>
    <form @submit.prevent="onSubmit" v-if="showFilters">
      <b-form-select class="schedule-filter-form-margin" :options="optionsOffice" size="sm" v-if="optionsOffice.length > 1"  v-model="selectedOffice" />
      <b-button :block="true" size="sm" variant="info">
        <font-awesome-icon icon="filter" /> Применить
      </b-button>
    </form>
  </b-col>
</template>

<script>
import bButton from "bootstrap-vue/es/components/button/button";
import bCol from "bootstrap-vue/es/components/layout/col";
import bFormSelect from "bootstrap-vue/es/components/form-select/form-select";
import Info from "./UserInfo.vue";

export default {
  data() {
    return {
      selectedOffice: null
    };
  },
  components: {
    "b-button": bButton,
    "b-col": bCol,
    "b-form-select": bFormSelect,
    "c-info": Info
  },
  computed: {
    optionsOffice() {
      const options = [{ value: null, text: "-все офисы-" }].concat(
        this.filters.offices
      );
      return options;
    },
    showFilters() {
      return this.filters.hasOwnProperty("offices") &&
        Array.isArray(this.filters.offices) &&
        this.filters.offices.length
        ? true
        : false;
    }
  },
  methods: {
    onSubmit() {}
  },
  props: {
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

<style>
.schedule-headers-margin {
  margin-top: 0.5rem;
}
.schedule-filter-form-margin {
  margin-bottom: 0.5rem;
}
</style>