<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <h4 class="schedule-top-half-rem-margin">Действия:</h4>
    <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/schedule/index')">
      <font-awesome-icon icon="calendar-alt" /> Расписание
    </button>
    <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/schedule/hours')" v-if="user.roleId === '3' || user.roleId === '4'">
      <font-awesome-icon icon="clock" /> Почасовка
    </button>
    <ul class="schedule-top-one-rem-margin">
      <li>Список "Группа" динамический и разблокируется только после выбора преподавателя.</li>
      <li>Список "Кабинет" динамический и разблокируется только после выбора офиса.</li>
      <li>Время окончания занятия автоматически подстраивается на +1 час, после выбора времени начала занятия.</li>
    </ul>
  </div>
</template>

<script>
import Info from "./UserInfo.vue";

export default {
  components: {
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


