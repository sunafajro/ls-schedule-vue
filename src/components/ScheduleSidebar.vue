<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-headers-margin">Действия:</h4>
    <button class="btn btn-success btn-sm btn-block" type="button" @click="$router.push('/schedule/create')">
      <font-awesome-icon icon="plus" /> Добавить
    </button>
    <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/schedule/hours')" v-if="user.roleId === '3' || user.roleId === '4'">
      <font-awesome-icon icon="clock" /> Почасовка
    </button>
    <h4 class="schedule-headers-margin">Фильтры:</h4>
    <form @submit.prevent="onSubmit">
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-filter-form-margin" v-if="optionsDay.length > 1" v-model="selectedDay">
        <option :key="`opt-days-${i}`" :value="option.value" v-for="(option, i) in optionsDay">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-filter-form-margin" v-if="optionsOffice.length > 1" v-model="selectedOffice">
        <option :key="`opt-office-${i}`" :value="option.value" v-for="(option, i) in optionsOffice">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-filter-form-margin" v-if="optionsLanguage.length > 1" v-model="selectedLanguage">
        <option :key="`opt-language-${i}`" :value="option.value" v-for="(option, i) in optionsLanguage">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-filter-form-margin" v-if="optionsEduForm.length > 1" v-model="selectedEduForm">
        <option :key="`opt-eduform-${i}`" :value="option.value" v-for="(option, i) in optionsEduForm">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-filter-form-margin" v-if="optionsEduAge.length > 1" v-model="selectedEduAge">
        <option :key="`opt-eduage-${i}`" :value="option.value" v-for="(option, i) in optionsEduAge">{{ option.text }}</option>
      </select>
      <select class="form-control form-control-sm custom-select custom-select-sm schedule-filter-form-margin" v-if="optionsTeacher.length > 1" v-model="selectedTeacher">
        <option :key="`opt-teacher-${i}`" :value="option.value" v-for="(option, i) in optionsTeacher">{{ option.text }}</option>
      </select>
      <button class="btn btn-info btn-sm btn-block" type="button">
        <font-awesome-icon icon="filter" /> Применить
      </button>
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
    optionsDay() {
      const options = [{ value: null, text: "-все дни-" }].concat(
        Array.isArray(this.filters.days) ? this.filters.days : []
      );
      return options;
    },
    optionsEduAge() {
      const options = [{ value: null, text: "-все возрасты-" }].concat(
        Array.isArray(this.filters.eduages) ? this.filters.eduages : []
      );
      return options;
    },
    optionsEduForm() {
      const options = [{ value: null, text: "-все формы-" }].concat(
        Array.isArray(this.filters.eduforms) ? this.filters.eduforms : []
      );
      return options;
    },
    optionsLanguage() {
      const options = [{ value: null, text: "-все языки-" }].concat(
        Array.isArray(this.filters.languages) ? this.filters.languages : []
      );
      return options;
    },
    optionsOffice() {
      const options = [{ value: null, text: "-все офисы-" }].concat(
        Array.isArray(this.filters.offices) ? this.filters.offices : []
      );
      return options;
    },
    optionsTeacher() {
      const options = [{ value: null, text: "-все преподаватели-" }].concat(
        Array.isArray(this.filters.teachers) ? this.filters.teachers : []
      );
      return options;
    }
  },
  data() {
    return {
      selectedDay: null,
      selectedEduAge: null,
      selectedEduForm: null,
      selectedLanguage: null,
      selectedOffice: null,
      selectedTeacher: null
    };
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