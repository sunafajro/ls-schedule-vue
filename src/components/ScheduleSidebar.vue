<template>
  <b-col sm="12" md="2" lg="2" xl="2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-headers-margin">Действия:</h4>
    <b-button :block="true" size="sm" variant="success" @click="$router.push('/schedule/create')">
      <font-awesome-icon icon="plus" /> Добавить
    </b-button>
    <b-button :block="true" size="sm" v-if="user.roleId === '3' || user.roleId === '4'" @click="$router.push('/schedule/hours')">
      <font-awesome-icon icon="clock" /> Почасовка
    </b-button>
    <h4 class="schedule-headers-margin">Фильтры:</h4>
    <form @submit.prevent="onSubmit">
      <b-form-select class="schedule-filter-form-margin" :options="optionsDay" size="sm" v-if="optionsDay.length > 1" v-model="selectedDay" />
      <b-form-select class="schedule-filter-form-margin" :options="optionsOffice" size="sm" v-if="optionsOffice.length > 1"  v-model="selectedOffice" />
      <b-form-select class="schedule-filter-form-margin" :options="optionsLanguage" size="sm" v-if="optionsLanguage.length > 1"  v-model="selectedLanguage" />
      <b-form-select class="schedule-filter-form-margin" :options="optionsEduForm" size="sm" v-if="optionsEduForm.length > 1"  v-model="selectedEduForm" />
      <b-form-select class="schedule-filter-form-margin" :options="optionsAge" size="sm" v-if="optionsAge.length > 1"  v-model="selectedAge" />
      <b-form-select class="schedule-filter-form-margin" :options="optionsTeacher" size="sm" v-if="optionsTeacher.length > 1"  v-model="selectedTeacher" />
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
      selectedAge: null,
      selectedDay: null,
      selectedEduForm: null,
      selectedLanguage: null,
      selectedOffice: null,
      selectedTeacher: null
    };
  },
  components: {
    "b-button": bButton,
    "b-col": bCol,
    "b-form-select": bFormSelect,
    "c-info": Info
  },
  computed: {
    optionsAge() {
      const options = [{ value: null, text: "-все возрасты-" }].concat(
        this.filters.eduages
      );
      return options;
    },
    optionsDay() {
      const options = [{ value: null, text: "-все дни-" }].concat(
        this.filters.days
      );
      return options;
    },
    optionsEduForm() {
      const options = [{ value: null, text: "-все формы-" }].concat(
        this.filters.eduforms
      );
      return options;
    },
    optionsLanguage() {
      const options = [{ value: null, text: "-все языки-" }].concat(
        this.filters.languages
      );
      return options;
    },
    optionsOffice() {
      const options = [{ value: null, text: "-все офисы-" }].concat(
        this.filters.offices
      );
      return options;
    },
    optionsTeacher() {
      const options = [{ value: null, text: "-все преподаватели-" }].concat(
        this.filters.teachers
      );
      return options;
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