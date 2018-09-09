<template>
  <div class="container-fluid">
    <router-view :user="user" />
  </div>
</template>

<script>
import axios from 'axios';

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
        this.user = data.user;
      } catch(e) {
        throw new Error("Ошибка получения сведений о пользователе!");
      }
    }
  }
};
</script>
