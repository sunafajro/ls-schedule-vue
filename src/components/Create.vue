<template>
    <b-row>
      <c-sidebar :user="user" />
      <c-content :offices="offices" :teachers="teachers" />
    </b-row>
</template>

<script>
import bRow from "bootstrap-vue/es/components/layout/row";
import Content from "./CreateContent.vue";
import Sidebar from "./CreateSidebar.vue";

export default {
  components: {
    "b-row": bRow,
    "c-content": Content,
    "c-sidebar": Sidebar
  },
  created() {
    Promise.all([this.getOffices(), this.getTeachers()])
      .then(result => {
        this.offices = result[0].offices;  
        this.teachers = result[1].teachers;
      });
  },
  data() {
    return {
      offices: [],
      teachers: []
    };
  },
  methods: {
    getOffices() {
      return fetch("/office/index?type=bootstrap")
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Ошибка получения офисов!");
          }
        });
    },
    getTeachers() {
      return fetch("/teacher/get-teachers-with-groups")
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Ошибка получения преподавателей!");
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