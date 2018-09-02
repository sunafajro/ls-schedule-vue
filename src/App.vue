<template>
  <b-container fluid>
    <router-view :user="user" />
  </b-container>
</template>

<script>
import bContainer from "bootstrap-vue/es/components/layout/container";

export default {
  components: {
    "b-container": bContainer
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
    getUserInfo() {
      return fetch("/user/get-info")
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Ошибка получения сведений о пользователе!");
          }
        })
        .then(result => {
          this.user = result.userData;
        })
        .catch(err => err);
    }
  }
};
</script>
