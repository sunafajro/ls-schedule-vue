<template>
  <b-col sm="12" md="2" lg="2" xl="2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-headers-margin">Действия:</h4>
    <b-button :block="true" size="sm" @click="$router.push('/schedule/index')">
      <font-awesome-icon icon="calendar-alt" /> Расписание
    </b-button>
    <b-button :block="true" size="sm" v-if="user.roleId === '3' || user.roleId === '4'" @click="$router.push('/schedule/hours')">
      <font-awesome-icon icon="clock" /> Почасовка
    </b-button>
    <ul class="schedule-create-list-margin">
      <li>Список "Группа" динамический и разблокируется только после выбора преподавателя.</li>
      <li>Список "Кабинет" динамический и разблокируется только после выбора офиса.</li>
    </ul>
  </b-col>
</template>

<script>
import bButton from "bootstrap-vue/es/components/button/button";
import bCol from "bootstrap-vue/es/components/layout/col";
import Info from "./UserInfo.vue";

export default {
  components: {
    "b-button": bButton,
    "b-col": bCol,
    "c-info": Info
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  }
};
</script>

<style>
.schedule-create-list-margin {
  margin-top: 1rem;
}
</style>
