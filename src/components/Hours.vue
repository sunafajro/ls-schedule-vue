<template>
  <div class="row" v-if="actions.hours">
    <c-sidebar :actions="actions" :filter="filterHours" :filters="filters" :user="user" />
    <c-content :columns="columns" :hours="hours"  />
  </div>
</template>

<script>
import axios from "axios";
import Content from "./HoursContent.vue";
import Sidebar from "./HoursSidebar.vue";
import { notify, prepareRows } from "../utils";

export default {
  components: {
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  async created() {
    try {
      const result = await Promise.all([
        this.getActions(),
        this.getScheduleFilters(),
        this.getScheduleHours()
      ]);
      this.actions = result[0].data.actions;
      this.filters = result[1].data.filters;
      this.columns = result[2].data.columns;
      this.hours = prepareRows(result[2].data.hours);
    } catch (e) {
      notify("error", "Ошибка получения данных с сервера!");
      throw new Error("Ошибка получения данных с сервера!");
    }
  },
  data() {
    return {
      actions: {
        create: false,
        delete: false,
        hours: false,
        update: false,
        view: false
      },
      columns: [],
      filters: {},
      hours: []
    };
  },
  methods: {
    getActions() {
      return axios.post("/schedule?t=actions");
    },
    getScheduleFilters() {
      return axios.post("/schedule?t=filters");
    },
    getScheduleHours() {
      return axios.post("/schedule?t=hours");
    },
    async filterHours(params = {}) {
      try {
        const { data } = await axios.post("/schedule?t=hours", params);
        this.hours = prepareRows(data.hours);
      } catch (e) {
        notify("error", "Ошибка фильтрации почасовок преподавателей!");
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