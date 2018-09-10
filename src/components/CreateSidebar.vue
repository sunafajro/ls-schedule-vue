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
    <h4 class="schedule-top-half-rem-margin">Подсказки:</h4>
    <div class="card schedule-top-half-rem-margin schedule-card-half-rem-padding"><small>Список "Группа" динамический и разблокируется только после выбора преподавателя.</small></div>
    <div class="card schedule-top-half-rem-margin schedule-card-half-rem-padding"><small>Список "Кабинет" динамический и разблокируется только после выбора офиса.</small></div>
    <div class="card schedule-top-half-rem-margin schedule-card-half-rem-padding"><small>Время окончания занятия автоматически подстраивается на +1 час, после выбора времени начала занятия.</small></div>
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


