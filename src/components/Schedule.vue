<template>
  <div class="row" v-if="actions.view">
    <c-sidebar :actions="actions" :filter="filterLessons" :filters="filters" :user="user" />
    <c-content :columns="columns" :deleteLesson="deleteLesson" :lessons="lessons" />
  </div>
</template>

<script>
import axios from "axios";
import Content from "./ScheduleContent.vue";
import Sidebar from "./ScheduleSidebar.vue";
import { createDaysSelectItems, getCsrfTocken, notify } from "../utils";

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
      this.lessons = Array.isArray(result[2].data.lessons)
        ? {}
        : result[2].data.lessons;
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
      lessons: {},
      filters: {},
      params: {}
    };
  },
  methods: {
    getActions() {
      return getCsrfTocken().then(token => {
        return axios.post("/schedule?t=actions", JSON.stringify(token), {
          headers: { "Content-Type": "application/json" }
        });
      });
    },
    getScheduleFilters() {
      return getCsrfTocken().then(token => {
        return axios.post("/schedule?t=filters", JSON.stringify(token), {
          headers: { "Content-Type": "application/json" }
        });
      });
    },
    getScheduleLessons() {
      return getCsrfTocken().then(token => {
        return axios.post("/schedule?t=lessons", JSON.stringify(token), {
          headers: { "Content-Type": "application/json" }
        });
      });
    },
    async filterLessons(params = {}) {
      try {
        const token = await getCsrfTocken();
        const body = { ...params };
        body._csrf = token._csrf;
        const { data } = await axios.post(`/schedule?t=lessons`, JSON.stringify(body), {
          headers: { "Content-Type": "application/json" }
        });
        this.params = params;
        this.lessons = Array.isArray(data.lessons) ? {} : data.lessons;
      } catch (e) {
        notify("error", "Ошибка фильтрации занятий в расписании!");
        throw new Error("Ошибка фильтрации занятий в расписании!");
      }
    },
    async deleteLesson(id) {
      try {
        const token = await getCsrfTocken();
        const body = { ...this.params };
        body._csrf = token._csrf;
        await axios.post(`/schedule/delete?id=${id}`, JSON.stringify(body), {
          headers: { "Content-Type": "application/json" }
        });
        await this.filterLessons(this.params);
        notify("success", "Занятие удалено из расписания!");
      } catch (e) {
        notify("error", "Ошибка удаления занятия из расписания!");
        throw new Error("Ошибка удаления занятия из расписания!");
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