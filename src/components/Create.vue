<template>
  <div class="row">
    <c-sidebar :user="user" />
    <c-content :getOfficeRooms="getOfficeRooms" :getTeacherGroups="getTeacherGroups" :groups="groups" :offices="offices" :rooms="rooms" :teachers="teachers" />
  </div>
</template>

<script>
import axios from "axios";
import { notify } from "../utils";
import Content from "./CreateContent.vue";
import Sidebar from "./CreateSidebar.vue";

export default {
  components: {
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  async created() {
    try {
      const result = await Promise.all([this.getOffices(), this.getTeachers()]);
      this.offices = result[0].data.offices;
      this.teachers = result[1].data.teachers;
    } catch (e) {
      notify("error", "Ошибка получения данных с сервера!");
      throw new Error("Ошибка получения данных с сервера!");
    }
  },
  data() {
    return {
      groups: [],
      offices: [],
      rooms: [],
      teachers: []
    };
  },
  methods: {
    getOffices() {
      return axios.get("/schedule/get-offices");
    },
    async getOfficeRooms(e) {
      try {
        const { data } = await axios.get(
          `/schedule/get-office-rooms?oid=${e.target.value}`
        );
        this.rooms = data.rooms;
      } catch (e) {
        notify("error", "Ошибка получения кабинетов офиса!");
        throw new Error("Ошибка получения кабинетов офиса!");
      }
    },
    getTeachers() {
      return axios.get("/schedule/get-teachers");
    },
    async getTeacherGroups(e) {
      try {
        const { data } = await axios(
          `/schedule/get-teacher-groups?tid=${e.target.value}`
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