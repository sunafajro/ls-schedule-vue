<template>
  <div class="row">
    <c-sidebar :filters="filters" :user="user" />
    <c-content :columns="columns" :lessons="lessons" />
  </div>
</template>

<script>
import axios from "axios";
import Content from "./ScheduleContent.vue";
import Sidebar from "./ScheduleSidebar.vue";
import { createDaysSelectItems } from "../utils";

export default {
  components: {
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  async created() {
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