<template>
    <b-row>
      <c-sidebar :filters="filters" :user="user" />
      <c-content />
    </b-row>
</template>

<script>
import bRow from "bootstrap-vue/es/components/layout/row";
import Content from "./ScheduleContent.vue";
import Sidebar from "./ScheduleSidebar.vue";

export default {
  components: {
    "b-row": bRow,
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  created() {
    Promise.all([this.getScheduleFilters(), this.getScheduleInfo()]).then(
      result => {
        this.filters = result[0].filtersData;
        this.lessons = result[1].lessonsData;
      }
    );
  },
  data() {
    return {
      filters: {},
      lessons: []
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
      return fetch("/schedule/get-info").then(response => {
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