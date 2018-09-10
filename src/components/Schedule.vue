<template>
  <div class="row">
    <c-sidebar :filter="filterLessons" :filters="filters" :user="user" />
    <c-content :columns="columns" :lessons="lessons" />
  </div>
</template>

<script>
import axios from "axios";
import Content from "./ScheduleContent.vue";
import Sidebar from "./ScheduleSidebar.vue";
import { createDaysSelectItems, notify, prepareUrlParams } from "../utils";

export default {
  components: {
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  async created() {
    try {
      const result = await Promise.all([
        this.getScheduleFilters(),
        this.getScheduleInfo()
      ]);
      this.filters = {
        ...result[0].data.filters,
        ...{ days: createDaysSelectItems() }
      };
      this.columns = result[1].data.columns;
      this.lessons = result[1].data.lessons;
    } catch (e) {
      notify("error", "Ошибка получения данных с сервера!");
      throw new Error("Ошибка получения данных с сервера!");
    }
  },
  data() {
    return {
      columns: [],
      lessons: [],
      filters: {}
    };
  },
  methods: {
    getScheduleFilters() {
      return axios.get("/schedule/get-filters");
    },
    getScheduleInfo() {
      return axios.get("/schedule/get-lessons");
    },
    async filterLessons(params = {}) {
      try {
        let url = prepareUrlParams(`/schedule/get-lessons`, params);
        const { data } = await axios.get(url);
        this.lessons = data.lessons;
      } catch (e) {
        notify("error", "Ошибка фильтрации занятий в расписании!");
        throw new Error("Ошибка фильтрации занятий в расписании!");
      }
    }
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  }
};
</script>