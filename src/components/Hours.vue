<template>
  <b-row>
    <c-sidebar :filters="filters" :user="user" />
    <c-content />
  </b-row>
</template>

<script>
import bRow from "bootstrap-vue/es/components/layout/row";
import Content from "./HoursContent.vue";
import Sidebar from "./HoursSidebar.vue";

export default {
  components: {
    "b-row": bRow,
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  created() {
    Promise.all([this.getScheduleFilters(), this.getScheduleHours()]).then(
      result => {
        this.filters = result[0].filtersData;
        this.hours = result[1].hoursData;
      }
    );
  },

  data() {
    return {
      filters: {},
      hours: []
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
    getScheduleHours() {
      return fetch("/schedule/get-hours").then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ошибка получения часов преподавателей!");
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
}
</script>