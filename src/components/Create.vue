<template>
  <div class="row" v-if="actions.create">
    <c-sidebar :actions="actions" :user="user" />
    <c-content :getOfficeRooms="getOfficeRooms" :getTeacherGroups="getTeacherGroups" :groups="groups" :offices="offices" :rooms="rooms" :teachers="teachers" />
  </div>
</template>

<script>
import axios from "axios";
import { getCsrfTocken, notify } from "../utils";
import Content from "./CreateContent.vue";
import Sidebar from "./CreateSidebar.vue";

export default {
  components: {
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  async created() {
    try {
      const result = await Promise.all([
        this.getActions(),
        this.getOffices(),
        this.getTeachers()
      ]);
      this.actions = result[0].data.actions;
      this.offices = result[1].data.offices;
      this.teachers = result[2].data.teachers;
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
      groups: [],
      offices: [],
      rooms: [],
      teachers: []
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
    getOffices() {
      return axios.get("/schedule/create?t=offices");
    },
    async getOfficeRooms(e) {
      try {
        const { data } = await axios.get(
          `/schedule/create?t=rooms&oid=${e.target.value}`
        );
        this.rooms = data.rooms;
      } catch (e) {
        notify("error", "Ошибка получения кабинетов офиса!");
        throw new Error("Ошибка получения кабинетов офиса!");
      }
    },
    getTeachers() {
      return axios.get("/schedule/create?t=teachers");
    },
    async getTeacherGroups(e) {
      try {
        const { data } = await axios.get(
          `/schedule/create?t=groups&tid=${e.target.value}`
        );
        // модифицируем массив
        const groups = data.groups.map(item => {
          return {
            value: item.value,
            text: `#${item.value} ${item.text}`
          };
        });
        this.groups = groups;
      } catch (e) {
        notify("error", "Ошибка получения групп преподавателя!");
        throw new Error("Ошибка получения групп преподавателя!");
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