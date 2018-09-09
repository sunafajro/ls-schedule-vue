<template>
  <div class="row">
    <c-sidebar :filters="filters" :user="user" :filter="filterHours"/>
    <c-content :columns="columns" :hours="hours"  />
  </div>
</template>

<script>
import axios from "axios";
import Content from "./HoursContent.vue";
import Sidebar from "./HoursSidebar.vue";
import { prepareRows } from "../utils";

export default {
  components: {
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  async created() {
    try {
      const result = await Promise.all([
        this.getScheduleFilters(),
        this.getScheduleHours()
      ]);
      this.filters = result[0].data.filters;
      this.columns = result[1].data.columns;
      this.hours = prepareRows(result[1].data.hours);
    } catch (e) {
      throw new Error("Ошибка получения данных с сервера!");
    }
  },
  data() {
    return {
      columns: [],
      filters: {},
      hours: []
    };
  },
  methods: {
    getScheduleFilters() {
      return axios.get("/schedule/get-filters");
    },
    getScheduleHours() {
      return axios.get("/schedule/get-hours");
    },
    async filterHours(oid = null) {
      try {
        const { data } = await axios.get(`/schedule/get-hours?oid=${oid}`);
        this.hours = prepareRows(data.hours);
      } catch (e) {
        throw new Error("Ошибка фильтрации почасовок преподавателей!");
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