<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-headers-margin">Действия:</h4>
    <button class="btn btn-success btn-sm btn-block" type="button" @click="$router.push('/schedule/create')">
      <font-awesome-icon icon="plus" /> Добавить
    </button>
    <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/schedule/index')">
      <font-awesome-icon icon="calendar-alt" /> Расписание
    </button>
    <h4 class="schedule-headers-margin">Фильтры:</h4>
    <form @submit.prevent="onSubmit">
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-filter-form-margin" v-if="optionsOffice.length > 1" v-model="selectedOffice">
        <option :key="`opt-offices-${i}`" :value="option.value" v-for="(option, i) in optionsOffice">{{ option.text }}</option>
      </select>
      <button class="btn btn-info btn-sm btn-block" type="submit">
        <font-awesome-icon icon="filter" /> Применить
      </button>
    </form>
  </div>
</template>

<script>
import Info from "./UserInfo.vue";

export default {
  data() {
    return {
      selectedOffice: null
    };
  },
  components: {
    "c-info": Info
  },
  computed: {
    optionsOffice() {
      const options = [{ value: null, text: "-все офисы-" }].concat(
        Array.isArray(this.filters.offices) ? this.filters.offices : []
      );
      return options;
    }
  },
  methods: {
    onSubmit() {
      if (this.selectedOffice) {
        this.filter(this.selectedOffice);
      }
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

<style>
.schedule-headers-margin {
  margin-top: 0.5rem;
}
.schedule-filter-form-margin {
  margin-bottom: 0.5rem;
}
</style>