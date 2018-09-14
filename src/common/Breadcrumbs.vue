<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">Главная</a></li>
      <li class="breadcrumb-item"><a href="#/schedule/index">Расписание</a></li>
      <li class="breadcrumb-item active" aria-current="page" v-if="name">{{ name }}</li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    name() {
      const links = {
        create: "Добавить занятие",
        hours: "Почасовка преподавателей"
      };
      const path = this.$route.path.split("/");
      return links[path[2]];
    }
  }
};
</script>

