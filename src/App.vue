<template>
  <div class="container-fluid">
    <c-breadcrumbs />
    <router-view :user="user" />
  </div>
</template>

<script>
import axios from "axios";
import Breadcrumbs from "./components/Breadcrumbs.vue";

export default {
  components: {
    "c-breadcrumbs": Breadcrumbs
  },
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await axios.get("/user/get-info");
        this.user = data.user;
      } catch (e) {
        throw new Error("Ошибка получения сведений о пользователе!");
      }
    }
  }
};
</script>
