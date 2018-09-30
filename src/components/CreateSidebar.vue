<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <div v-if="actions.view || actions.hours">
      <h4 class="schedule-top-half-rem-margin">Действия:</h4>
      <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/')" v-if="actions.view">
        <i class="fa fa-calendar" aria-hidden="true"></i> Расписание
      </button>
      <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/hours')" v-if="actions.create">
        <i class="fa fa-clock-o" aria-hidden="true"></i> Почасовка
      </button>
    </div>
    <h4 class="schedule-top-half-rem-margin">Подсказки:</h4>
    <div class="panel panel-default schedule-top-half-rem-margin schedule-card-half-rem-padding"><small>Список "Группа" динамический и разблокируется только после выбора преподавателя.</small></div>
    <div class="panel panel-default schedule-top-half-rem-margin schedule-card-half-rem-padding"><small>Список "Кабинет" динамический и разблокируется только после выбора офиса.</small></div>
    <div class="panel panel-default schedule-top-half-rem-margin schedule-card-half-rem-padding"><small>Время окончания занятия автоматически подстраивается на +1 час, после выбора времени начала занятия.</small></div>
  </div>
</template>

<script>
import Info from "./UserInfo.vue";

export default {
  components: {
    "c-info": Info
  },
  props: {
    actions: {
      required: true,
      type: Object
    },
    user: {
      required: true,
      type: Object
    }
  }
};
</script>


