<template>
    <b-row>
      <c-sidebar :filters="filters" :user="user" />
      <c-content :columns="columns" :lessons="lessons" />
    </b-row>
</template>

<script>
import bRow from "bootstrap-vue/es/components/layout/row";
import Content from "./ScheduleContent.vue";
import Sidebar from "./ScheduleSidebar.vue";
import { createDaysSelectItems } from "../utils";

export default {
  components: {
    "b-row": bRow,
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  computed: {
    filters() {
      const days = {
        days: createDaysSelectItems()
      }
      const filters = { ...this.rawFilters, ...days };
      return filters;
    }
  },
  created() {
    Promise.all([this.getScheduleFilters(), this.getScheduleInfo()]).then(
      result => {
        this.rawFilters = result[0].filtersData;
        this.columns = result[1].columns;
        this.lessons = result[1].lessonsData;
      }
    );
  },
  data() {
    return {
      columns: [],
      lessons: [],
      rawFilters: {},
    };
  },
  methods: {
    getScheduleFilters() {
      return fetch("/schedule/get-filters").then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка получения фильтров!");
        }
      });
    },
    getScheduleInfo() {
      return fetch("/schedule/get-schedule-info").then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка получения записей расписания!");
        }
      });
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>