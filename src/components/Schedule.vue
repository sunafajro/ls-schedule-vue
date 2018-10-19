<template>
  <div class="row" v-if="actions.view">
    <c-sidebar :actions="actions" :filter="filterLessons" :filters="filters" :user="user" />
    <c-content :columns="columns" :lessons="lessons" :offices="filters.offices" />
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
        this.getActions(),
        this.getScheduleFilters(),
        this.getScheduleLessons()
      ]);
      this.actions = result[0].data.actions;
      this.filters = {
        ...result[1].data.filters,
        ...{ days: createDaysSelectItems() }
      };
      this.columns = result[2].data.columns;
      this.lessons = result[2].data.lessons;
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
      lessons: [],
      filters: {}
    };
  },
  methods: {
    getActions() {
      return axios.post("/schedule?t=actions");
    },
    getScheduleFilters() {
      return axios.post("/schedule?t=filters");
    },
    getScheduleLessons() {
      return axios.post("/schedule?t=lessons");
    },
    async filterLessons(params = {}) {
      try {
        //let url = prepareUrlParams(`/schedule?t=lessons`, params);
        const { data } = await axios.post(`/schedule?t=lessons`, params);
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