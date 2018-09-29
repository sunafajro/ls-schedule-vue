<template>
  <div id="schedule">
    <router-view :user="user" />
  </div>
</template>

<script>
import axios from "axios";
import { notify } from "./utils";

export default {
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
        this.user = data.userData;
      } catch (e) {
        notify("error", "Ошибка получения сведений о пользователе!");
        throw new Error("Ошибка получения сведений о пользователе!");
      }
    }
  }
};
</script>
