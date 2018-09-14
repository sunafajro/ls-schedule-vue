<template>
  <div class="page-wrapper">
    <c-header />
    <main role="main" class="container-fluid">
      <c-breadcrumbs />
      <router-view :user="user" />
    </main>
    <c-footer />
  </div>
</template>

<script>
import axios from "axios";
import { notify } from "./utils";
import Breadcrumbs from "./common/Breadcrumbs.vue";
import Footer from "./common/Footer.vue";
import Header from "./common/Header.vue";

export default {
  components: {
    "c-breadcrumbs": Breadcrumbs,
    "c-footer": Footer,
    "c-header": Header
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
        notify("error", "Ошибка получения сведений о пользователе!");
        throw new Error("Ошибка получения сведений о пользователе!");
      }
    }
  }
};
</script>
